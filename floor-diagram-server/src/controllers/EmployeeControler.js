const employeeService = require("../services/EmployeeService");

class EmployeeController {
  // [GET] /api/employees/me
  async getMe(req, res, next) {
    try {
      const response = await employeeService.getMe(req);

      res.status(200).json(response);
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  // [POST] /api/employees
  async addEmployee(req, res, next) {
    try {
      const response = await employeeService.addEmployee(req.body);

      res.status(200).json(response);
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  // [GET] /api/employees
  async getListEmployees(req, res, next) {
    try {
      const response = await employeeService.getListEmployees();

      res.status(200).json(response);
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  // [GET] /api/employees/:id
  async getEmployeeById(req, res, next) {
    try {
      const response = await employeeService.getEmployeeById(req.params.id);

      res.status(200).json(response);
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  // [PUT] /api/employees/:id
  async updateEmployee(req, res, next) {
    try {
      const response = await employeeService.updateEmployee(
        req.params.id,
        req.body
      );

      res.status(200).json(response);
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  // [DELETE] /api/employees/:id
  async deleteEmployee(req, res, next) {
    try {
      const response = await employeeService.deleteEmployee(req.params.id);

      res.status(200).json(response);
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }
}

module.exports = new EmployeeController();
