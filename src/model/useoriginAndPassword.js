const mongoose = require("mongoose");
const User = require("./user");

const Schema = mongoose.Schema;

const userOriginAndPasswordSchema = mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "user" },
  originName: { type: String, required: true },

  originPassword: { type: String, required: true },
});

const UserDetails = mongoose.model(
  "userOriginAndPasswordSchema",
  userOriginAndPasswordSchema
);

module.exports = UserDetails;
