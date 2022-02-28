const express = require("express");
const employeeControler = require("../controllers/EmployeeControler");
const router = express.Router();

const employeeRouter = () => {
  router.get("/me", employeeControler.getMe);

  return router;
};

module.exports = employeeRouter;
