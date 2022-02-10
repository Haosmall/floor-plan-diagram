const express = require("express");
const projectController = require("../controllers/ProjectController");
const router = express.Router();

const projectRouter = () => {
	router.post("", projectController.addProject);
	router.put("/:id", projectController.updateProject);
	router.delete("/:id", projectController.deleteProject);
	router.get("/:id/shapes", projectController.getShapesByProject);

	return router;
};

module.exports = projectRouter;
