const mongoose = require("mongoose");

const NewRoomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
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
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    isLive: {
      type: Boolean,
      required: true,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Ensure this is an ObjectId to reference the User model
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userProfile: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Pre middleware to handle the removal of room reference from the user document
const NewRoom =
  mongoose.models.NewRoom || mongoose.model("NewRoom", NewRoomSchema);

module.exports = NewRoom;
