const buildingAdminService = require("../services/BuildingAdminService");

class AdminController {
  // [POST] /login
  async login(req, res, next) {
    try {
      const response = await buildingAdminService.login(req.body);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AdminController();
