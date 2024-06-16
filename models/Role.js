const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const RoleModel = mongoose.model("role", roleSchema);
module.exports = RoleModel;
