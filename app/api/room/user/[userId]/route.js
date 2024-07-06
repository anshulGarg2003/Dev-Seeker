import connectToDatabase from "@/database/mongoose";
import { NextResponse } from "next/server";
import NewRoom from "@/database/model/room2";

export async function GET(req, { params }) {
  await connectToDatabase();

  const { userId } = params;
  console.log(userId);

  try {
    const rooms = await NewRoom.find({ userId: userId });
    return NextResponse.json(rooms, { status: 200 });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json(
      { error: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}
