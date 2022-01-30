const express = require("express");
const userController = require("../controllers/UserController");
const router = express.Router();

const userRouter = () => {
	router.get("/", userController.getListUser);
	router.get("/me", userController.getUserById);
	return router;
};

module.exports = userRouter;
