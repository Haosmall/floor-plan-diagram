const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    username: {
      type: String,
      required: true,
      min: 6,
      max: 225,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
