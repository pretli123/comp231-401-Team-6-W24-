const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, required: true },
  Date: { type: Date, default: Date.now },
});

const UserRegistration = mongoose.model('UserRegistration', userSchema);

module.exports = UserRegistration;