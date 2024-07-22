"use server";
import NewUser from "@/database/model/user2";
import connectToDatabase from "@/database/mongoose";

export default async function GET(req, res) {
  const { user } = req.query;

  await connectToDatabase();

  try {
    const userDetails = await NewUser.findById(user);
    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(userDetails);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching user details" });
  }
}
