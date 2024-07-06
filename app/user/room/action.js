"use server";

import { getSession } from "@/lib/auth";
export async function DeleteRoom(room) {
  const session = await getSession();

  if (!session) {
    throw new Error("User is not Authenticate");
  }

  if (room.userId !== session.user.id) {
    throw new Error("User is not authorized");
  }
  const roomId = room._id;
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/room/${roomId}`,
      {
        method: "DELETE",
      }
    );

    if (response.status == 200) {
      return true;
    } else {
      const errorData = await response.json();
      console.log(`Failed to delete room: ${errorData.error}`);
    }
  } catch (error) {
    console.error("Error deleting room:", error);
  }
}
