const mongoose = require("mongoose");

const TestimonalSchema = new mongoose.Schema(
  {
    feedback: { type: String, required: true },
    star: { type: Number, required: true, default: 5 },
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
const Testimonal =
  mongoose.models.Testimonal || mongoose.model("Testimonal", TestimonalSchema);

module.exports = Testimonal;
