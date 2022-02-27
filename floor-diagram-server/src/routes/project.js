const express = require("express");
const projectController = require("../controllers/ProjectController");
const router = express.Router();

const projectRouter = () => {
  router.post("", projectController.addProject);
  router.get("", projectController.getListProjects);
  router.get("/:id", projectController.getProjectById);
  router.put("/:id", projectController.updateProject);
  router.delete("/:id", projectController.deleteProject);
  router.get("/:id/team", projectController.getTeamByProject);
  router.get("/:id/employees", projectController.getListEmployeeByProject);

  return router;
};

module.exports = projectRouter;
