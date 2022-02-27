const User = require("../models/User");
const authService = require("../services/AuthService");

class HealthController {
	// [GET] /health
	async healthCheck(req, res, next) {
		try {
			// const response = await authService.registry(req.body);

			// res.status(200).json(response);
			res.status(200).send("hello world");
		} catch (err) {
			// console.log(err);
			next(err);
		}
	}
}

module.exports = new HealthController();
