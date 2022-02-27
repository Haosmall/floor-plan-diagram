const express = require("express");
const userController = require("../controllers/UserController");
const router = express.Router();

const userRouter = () => {
	router.get("/", userController.getListUser);
	router.get("/me", userController.getUserById);
	router.get("/:id", userController.getListUserPlacesByUserId);

	return router;
};

module.exports = userRouter;
