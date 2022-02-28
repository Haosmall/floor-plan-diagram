const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const employeeSchema = new Schema(
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
      min: 6,
      max: 255,
    },
    isAdmin: {
      // true => admin building
      type: Boolean,
      required: true,
      default: false,
    },
    building: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Building",
    },
    floor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Floor",
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  },
  { timestamps: true }
);

employeeSchema.statics.findByCredentials = async (username, password) => {
  const employee = await Employee.findOne({
    username,
  });
  if (!employee) throw new Error("Employee not found");
  if (!employee.isAdmin) throw new Error("Employee is not an admin");

  const isPasswordMatch = await bcrypt.compare(password, employee.password);
  if (!isPasswordMatch) throw new Error("Password invalid");

  return employee;
};

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
