// service of admin cap cao
const Admin = require("../models/Admin");
const tokenUtils = require("../utils/tokenUtils");
const { registerValidator, loginValidator } = require("../validations/auth");

class AdminService {
  async registry(data) {
    const { error } = registerValidator(data);
    if (error) throw new Error(error.details[0].message);

    const checkUsernameExist = await Admin.findOne({
      username: data.username,
    });
    if (checkUsernameExist) throw new Error("Username is exist");

    // else
    const newAdmin = new Admin(data);
    const { _id, name, username } = await newAdmin.save();
    const token = await this.generateAndUpdateAccessToken(_id);

    return { _id, name, username, token };
  }

  async login(account) {
    const { error } = loginValidator(account);
    if (error) throw new Error(error.details[0].message);

    const { _id, name, username } = await Admin.findByCredentials(
      account.username,
      account.password
    );
    const token = await this.generateAndUpdateAccessToken(_id);

    return { _id, name, username, token };
  }

  async generateAndUpdateAccessToken(_id) {
    return await tokenUtils.generateToken({ _id });
  }
}

module.exports = new AdminService();
