const express = require("express");
const groupController = require("../controllers/GroupController");
const router = express.Router();

const groupRouter = () => {
  router.post("", groupController.addGroup);
  router.get("", groupController.getListGroups);
  router.get("/:id", groupController.getGroupById);
  router.put("/:id", groupController.updateGroup);
  router.delete("/:id", groupController.deleteGroup);
  router.get("/:id/teams", groupController.getListTeamByGroup);
  router.get("/:id/projects", groupController.getListProjectByGroup);
  router.get("/:id/employees", groupController.getListEmployeeByGroup);

  return router;
};

module.exports = groupRouter;
