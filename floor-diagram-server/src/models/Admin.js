const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 5,
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

adminSchema.pre("save", async function (next) {
  const admin = this;
  admin.password = await bcrypt.hash(admin.password, 8);
  next();
});

adminSchema.statics.findByCredentials = async (username, password) => {
  const admin = await Admin.findOne({
    username,
  });
  if (!admin) throw new Error("Admin not found");

  const isPasswordMatch = await bcrypt.compare(password, admin.password);
  if (!isPasswordMatch) throw new Error("Password invalid");

  return admin;
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
