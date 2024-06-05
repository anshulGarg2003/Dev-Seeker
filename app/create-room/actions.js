"use server";
import Room from "@/database/model/room";
import User from "@/database/model/user"; // Ensure the correct import path
import connectDB from "@/database/mongoose";
import { getSession } from "@/lib/auth";

export async function CreateRoomAction({
  name,
  description,
  language,
  githubrepo,
}) {
  console.log({ name, description, language, githubrepo });
  const session = await getSession();
  if (session) {
    await connectDB();

    const newRoom = await Room.create({
      name,
      description,
      language,
      githubrepo,
      userId: session.user.id,
    });

    let existingUser = await User.findById(session.user.id);
    if (existingUser) {
      existingUser.rooms.push(newRoom._id);
      await existingUser.save();
    } else {
      return "User not found";
    }

    return "Room has been created";
  } else {
    return "Please login first";
  }
}
