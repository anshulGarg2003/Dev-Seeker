const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
    return "Connected...";
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

module.exports = connectDB;
