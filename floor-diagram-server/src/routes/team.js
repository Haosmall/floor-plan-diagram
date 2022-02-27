const express = require("express");
const teamController = require("../controllers/TeamController");
const router = express.Router();

const teamRouter = () => {
  router.post("", teamController.addTeam);
  router.get("", teamController.getListTeams);
  router.get("/:id", teamController.getTeamById);
  router.put("/:id", teamController.updateTeam);
  router.delete("/:id", teamController.deleteTeam);
  router.get("/:id/project", teamController.getProjectByTeam);
  router.get("/:id/employees", teamController.getListEmployeeByTeam);

  return router;
};

module.exports = teamRouter;
