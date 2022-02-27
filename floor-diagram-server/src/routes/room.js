const express = require("express");
const roomController = require("../controllers/RoomController");
const router = express.Router();

const floorRouter = () => {
  router.post("", roomController.addRoom);
  router.get("", roomController.getListRooms);
  router.get("/:id", roomController.getRoomById);
  router.put("/:id", roomController.updateRoom);
  router.delete("/:id", roomController.deleteRoom);
  router.get("/:id/groups", roomController.getListGroupByRoom);
  router.get("/:id/teams", roomController.getListTeamByRoom);
  router.get("/:id/projects", roomController.getListProjectByRoom);
  router.get("/:id/employees", roomController.getListEmployeeByRoom);
  router.get("/:id/shapes", roomController.getListShapeByRoom);

  return router;
};

module.exports = floorRouter;
