// service of admin cap cao
const Employee = require("../models/Employee");
const tokenUtils = require("../utils/tokenUtils");
const { loginValidator } = require("../validations/auth");

class BuildingAdminService {
  async login(account) {
    const { error } = loginValidator(account);
    if (error) throw new Error(error.details[0].message);

    const { _id, name, username, isAdmin } = await Employee.findByCredentials(
      account.username,
      account.password
    );
    const token = await tokenUtils.generateToken(_id);

    return { _id, name, username, token, isAdmin };
  }
}

module.exports = new BuildingAdminService();
