const express = require("express");
const { isAdmins } = require("../middleware/auth");
const employeeControler = require("../controllers/EmployeeControler");
const router = express.Router();

const employeeRouter = () => {
  router.post("", isAdmins, employeeControler.addEmployee);
  router.get("", isAdmins, employeeControler.getListEmployees);
  router.get("/me", isAdmins, employeeControler.getMe);
  router.get("/:id", isAdmins, employeeControler.getEmployeeById);
  router.put("/:id", employeeControler.updateEmployee);
  router.delete("/:id", isAdmins, employeeControler.deleteEmployee);

  return router;
};

module.exports = employeeRouter;
