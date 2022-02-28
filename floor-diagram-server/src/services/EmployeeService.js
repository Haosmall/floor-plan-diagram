const Employee = require("../models/Employee");
const { generateToken } = require("../utils/tokenUtils");
const { registerValidator } = require("../validations/auth");
const bcrypt = require("bcryptjs");

class EmployeeService {
  // add
  async addEmployee(empInfo) {
    // required fields: name, username
    const { error } = registerValidator(empInfo);
    if (error) throw new Error(error.details[0].message);

    const checkUsernameExist = await Employee.findOne({
      username: empInfo.username,
    });
    if (checkUsernameExist) throw new Error("Username is exist");

    empInfo.password = bcrypt.hashSync("123456", 8);
    const newEmp = new Employee(empInfo);
    const savedEmp = await newEmp.save();

    return savedEmp;
  }

  // get list
  async getListEmployees() {
    const employees = await Employee.find({}).populate(
      "building floor room group project team"
    );

    return employees;
  }

  // get employee by id
  async getEmployeeById(empId) {
    const employee = await Employee.findById(empId).populate(
      "building floor room group project team"
    );

    return employee;
  }

  // update
  async updateEmployee(_id, empInfo) {
    empInfo.password = bcrypt.hashSync(empInfo.password, 8);
    let updatedEmp = await Employee.findOneAndUpdate({ _id }, empInfo, {
      new: true,
    });

    return updatedEmp;
  }

  // delete
  async deleteEmployee(_id) {
    const deletedEmp = await Employee.findByIdAndDelete(_id);

    return deletedEmp;
  }

  async promoteEmployee(empId) {
    const employee = await Employee.findById(empId);
    if (!employee) throw new Error("Employee not found");

    employee.isAdmin = true;
    const { _id, name, username, isAdmin } = await employee.save();

    const token = await generateToken(_id);

    return { _id, name, username, isAdmin, token };
  }
}

module.exports = new EmployeeService();
