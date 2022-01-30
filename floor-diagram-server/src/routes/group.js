const express = require("express");
const groupController = require("../controllers/GroupController");
const router = express.Router();

const groupRouter = () => {
	router.post("", groupController.addGroup);
	router.put("/:id", groupController.updateGroup);
	router.delete("/:id", groupController.deleteGroup);

	return router;
};

module.exports = groupRouter;
