const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  mobileNumber: {
    type: Number,
    rquired: true,
  },
  mpin: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
