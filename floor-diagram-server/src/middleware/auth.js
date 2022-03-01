const Admin = require("../models/Admin");
const Employee = require("../models/Employee");
const tokenUtils = require("../utils/tokenUtils");
const jwt = require("jsonwebtoken");

exports.isAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const data = await tokenUtils.verifyToken(token);

    const admin = await Admin.findById(data._id);
    if (!admin) throw new Error("Not authorized to access this resource");

    next();
  } catch (error) {
    res.status(401).send({
      status: 401,
      error: "Not authorized to access this resource",
    });
  }
};

exports.isAdmin_or_buildingAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const data = await tokenUtils.verifyToken(token);

    const admin = await Admin.findById(data._id);
    const employee = await Employee.findById(data._id);

    if (admin || employee?.isBuildingAdmin) next();
    else throw new Error("Invalid token");
  } catch (error) {
    res.status(401).send({
      status: 401,
      error: "Not authorized to access this resource",
    });
  }
};

exports.isNormalEmployee = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const data = await tokenUtils.verifyToken(token);

    const employee = await Employee.findById(data._id);

    if (employee) next();
    else throw new Error("Invalid token");
  } catch (error) {
    res.status(401).send({
      status: 401,
      error: "Not authorized to access this resource",
    });
  }
};
