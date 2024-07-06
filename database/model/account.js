const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  provider: { type: String, required: true },
  providerAccountId: { type: String, required: true },
  type: { type: String, required: true },
  accessToken: { type: String, required: true },
  idToken: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "NewUser" },
});

const Account =
  mongoose.models.Account || mongoose.model("Account", AccountSchema);

module.exports = Account;
