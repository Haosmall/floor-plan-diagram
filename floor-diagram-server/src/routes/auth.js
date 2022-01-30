const express = require("express");
const authController = require("../controllers/AuthController");
const router = express.Router();

const authRouter = () => {
	router.get("", (req, res, next) => res.send("hello"));
	router.post("/registry", authController.registry);
	router.post("/login", authController.login);
	return router;
};

module.exports = authRouter;
