const Employee = require("../models/Employee");
const Admin = require("../models/Admin");
const adminService = require("../services/AdminService");

class AdminController {
  // [GET] /me
  async getMe(req, res, next) {
    try {
      const response = await adminService.getMe(req);

      res.status(201).json(response);
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  // [POST] /registry
  async registry(req, res, next) {
    try {
      const response = await adminService.registry(req.body);

      res.status(201).json(response);
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  // [POST] /login
  async login(req, res, next) {
    try {
      const response = await adminService.login(req.body);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AdminController();
