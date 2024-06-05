const { Schema, models, default: mongoose } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
