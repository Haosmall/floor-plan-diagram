const { Seeder } = require("mongoose-data-seed");
const Admin = require("../src/models/Admin");
const bcrypt = require("bcryptjs");

const data = [
  {
    name: "Admin",
    username: "admin",
    password: bcrypt.hashSync("123456", 8),
  },
];

class AdminSeeder extends Seeder {
  async shouldRun() {
    return Admin.countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    return Admin.create(data);
  }
}

module.exports = AdminSeeder;
