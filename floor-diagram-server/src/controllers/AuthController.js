const User = require("../models/User");
const authService = require("../services/AuthService");

class AuthController {
	// [POST] /registry
	async registry(req, res, next) {
		try {
			const response = await authService.registry(req.body);

			res.status(201).json(response);
		} catch (err) {
			// console.log(err);
			next(err);
		}
	}

	// [POST] /login
	async login(req, res, next) {
		try {
			const response = await authService.login(req.body);
			res.status(200).json(response);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new AuthController();
