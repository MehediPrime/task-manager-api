const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const UserModel = model("user", userSchema);
module.exports = UserModel;
