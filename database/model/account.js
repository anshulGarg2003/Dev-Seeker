import mongoose from "mongoose";

const { Schema, models } = mongoose;

const AccountSchema = new Schema({
  provider: { type: String, required: true },
  providerAccountId: { type: String, required: true },
  type: { type: String, required: true },
  accessToken: { type: String, required: true },
  idToken: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Account = models.Account || mongoose.model("Account", AccountSchema);

export default Account;
