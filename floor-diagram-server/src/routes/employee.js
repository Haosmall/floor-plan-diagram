const express = require("express");
const employeeControler = require("../controllers/EmployeeControler");
const router = express.Router();

const employeeRouter = () => {
  router.post("", employeeControler.addEmployee);
  router.get("", employeeControler.getListEmployees);
  router.get("/:id", employeeControler.getEmployeeById);
  router.put("/:id", employeeControler.updateEmployee);
  router.delete("/:id", employeeControler.deleteEmployee);
  router.put("/promote/:id", employeeControler.promoteEmployee);
  router.post("/admin/login", employeeControler.login);

  return router;
};

module.exports = employeeRouter;
