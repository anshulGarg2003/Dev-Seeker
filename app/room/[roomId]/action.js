"use server";

import NewRoom from "@/database/model/room2";
import { getSession } from "@/lib/auth";
import { StreamChat } from "stream-chat";

export async function generateTokenAction() {
  const session = await getSession();
  const apikey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY;
  const secret = process.env.NEXT_PUBLIC_GET_STREAM_SECRET;

  const serverClient = StreamChat.getInstance(apikey, secret);
  const token = serverClient.createToken(session?.user?.id || "helloguys123");

  return token;
}

export async function OnAir(roomId, isPageVisible) {
  const date = new Date();
  console.log(roomId, isPageVisible, "from OnAir", date);

  try {
    const room = await NewRoom.findById(roomId); // Await the findById method
    // console.log(room);

    if (!room) {
      throw new Error("Room doesn't exist!!");
    }

    room.isLive = isPageVisible;

    await room.save(); // Await the save method

    return;
  } catch (err) {
    console.error("Error updating room status:", err); // Log the error
  }
}
