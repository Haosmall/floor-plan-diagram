const User = require("../models/User");
const userService = require("../services/UserService");

class UserController {
  // [GET] /users
  async getListUser(req, res, next) {
    try {
      const response = await userService.getListUsers(req.query.name || "");
      res.status(200).json(response);
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  // [GET] /users/me
  async getUserById(req, res, next) {
    try {
      const response = await userService.getUserById(req._id);
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  // [GET] /users/:id
  async getListUserPlacesByUserId(req, res, next) {
    try {
      const response = await userService.getListUserPlacesByUserId(req._id);
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = new UserController();
