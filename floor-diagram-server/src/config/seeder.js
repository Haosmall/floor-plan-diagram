const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

const seeder = async () => {
  const admin = await Admin.find({});
  if (!admin.length) {
    const password = bcrypt.hashSync("123456", 8);
    const newAdmin = new Admin({ name: "Admin", username: "admin", password });
    await newAdmin.save();
    console.log("Seeder: default admin created");
  }
};

module.exports = seeder;
