// service of admin cap cao
const Admin = require("../models/Admin");
const Employee = require("../models/Employee");
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
    const token = await tokenUtils.generateToken({ _id });

    return { _id, name, username, token };
  }

  async login(account) {
    const { error } = loginValidator(account);
    if (error) throw new Error(error.details[0].message);

    // --- Admin
    const admin = await Admin.findByCredentials_2(
      account.username,
      account.password
    );
    // --- Employee
    const employee = await Employee.findByCredentials_2(
      account.username,
      account.password
    );

    if (admin) {
      const token = await tokenUtils.generateToken({ _id: admin._id });
      return {
        _id: admin._id,
        name: admin.name,
        username: admin.username,
        isAdmin: true,
        token,
      };
    }

    if (employee) {
      const token = await tokenUtils.generateToken({ _id: employee._id });
      return {
        _id: employee._id,
        name: employee.name,
        username: employee.username,
        isBuildingAdmin: employee.isBuildingAdmin,
        token,
      };
    }

    if (!admin && !employee)
      throw new Error("Your credentials provided incorrectly");
  }
}

module.exports = new AdminService();
