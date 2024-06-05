// models/Room.js
import mongoose, { Mongoose } from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    language: {
      type: String,
      default: "Programming",
    },
    githubrepo: {
      type: String,
    },
    userId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Room = mongoose.models.Room || mongoose.model("Room", RoomSchema);
export default Room;
