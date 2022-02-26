const Admin = require("../models/Admin");
const Employee = require("../models/Employee");
const tokenUtils = require("../utils/tokenUtils");

exports.isAdmin = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ message: "There's no token" });
  }

  const token = authorization.split(" ")[1];
  tokenUtils
    .verifyToken(token)
    .then(async (decode) => {
      const admin = await Admin.findById(decode._id);
      if (!admin) {
        return res.status(401).send({
          message: "Unauthorized to access this resource",
        });
      }
      req.admin = admin;

      next();
    })
    .catch((err) => {
      res.status(401).send({ message: err });
    });
};

exports.isAdmin_or_buildingAdmin = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ message: "There's no token" });
  }

  const token = authorization.split(" ")[1];
  tokenUtils
    .verifyToken(token)
    .then(async (decode) => {
      const employee = await Employee.findById(decode._id);
      const admin = await Admin.findById(decode._id);

      if (admin || employee.isAdmin) {
        next();
      } else {
        return res.status(401).send({
          message: "Unauthorized to access this resource",
        });
      }
    })
    .catch((err) => {
      res.status(401).send({ message: err });
    });
};
