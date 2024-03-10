const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, required: true },
  Date: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;