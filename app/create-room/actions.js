"use server";
import NewRoom from "@/database/model/room2";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose"; // Import mongoose to use ObjectId
import connectToDatabase from "@/database/mongoose";
import NewUser from "@/database/model/user2";

export async function CreateRoomAction({
  name,
  description,
  language,
  githubrepo,
}) {
  console.log({ name, description, language, githubrepo });
  const session = await getSession();
  if (session) {
    await connectToDatabase();

    // Convert userId to ObjectId
    const userId = new mongoose.Types.ObjectId(session.user.id);

    let existingUser = await NewUser.findById(userId);

    if (!existingUser) {
      throw new Error("User not found");
      return;
    }

    if (existingUser.totalcoins < parseInt(process.env.ROOM_CREATE_COINS, 10)) {
      throw new Error("You don't have sufficient Coins.");
      return;
    }

    const newRoom = await NewRoom.create({
      name,
      description,
      language,
      githubrepo,
      userId: userId,
      userName: session.user.name,
      userProfile: session.user.image,
    });
    const savedroom = await newRoom.save();
    const savedRoomId = new mongoose.Types.ObjectId(savedroom._id);

    console.log(savedRoomId);

    existingUser.rooms.push(savedRoomId);

    existingUser.totalcoins -= parseInt(process.env.ROOM_CREATE_COINS, 10);
    const newTransaction = {
      status: 300,
      name: name.trim().substring(0, 10),
      time: new Date().toLocaleDateString("en-GB"),
      remaincoins: existingUser.totalcoins,
    };

    existingUser.transaction.unshift(newTransaction);

    if (existingUser.transaction.length > 10) {
      existingUser.transaction.shift();
    }

    await existingUser.save();

    revalidatePath("/browse");
  } else {
    return "Please login first";
  }
}
