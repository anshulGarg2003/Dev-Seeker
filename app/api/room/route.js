"use server";
import NewRoom from "@/database/model/room2";
import connectToDatabase from "@/database/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  try {
    const rooms = await NewRoom.find({});
    return NextResponse.json(rooms, { status: 200 });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
}
