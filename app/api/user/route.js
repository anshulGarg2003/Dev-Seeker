import User from "@/database/model/user";
import connectDB from "@/database/mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, email } = await request.json();
  await connectDB();

  const existingUsername = await User.findOne({ $or: [{ name }] });
  const existingUseremail = await User.findOne({ $or: [{ email }] });

  if (existingUsername) {
    return NextResponse.json("Username already exists");
  }
  if (existingUseremail) {
    return NextResponse.json("Email already exists");
  }

  const newUser = new User({
    name,
    email,
  });
  try {
    const savedUser = await newUser.save();
    return NextResponse.json({ message: "Added successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
}
