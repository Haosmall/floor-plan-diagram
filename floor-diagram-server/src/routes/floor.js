const express = require("express");
const floorController = require("../controllers/FloorController");
const router = express.Router();

const floorRouter = () => {
  router.post("", floorController.addFloor);
  router.get("", floorController.getListFloors);
  router.get("/:id", floorController.getFloorById);
  router.put("/:id", floorController.updateFloor);
  router.delete("/:id", floorController.deleteFloor);
  router.get("/:id/rooms", floorController.getListRoomByFloorId);
  router.get("/:id/groups", floorController.getListGroupByFloor);
  router.get("/:id/teams", floorController.getListTeamByFloor);
  router.get("/:id/projects", floorController.getListProjectByFloor);
  router.get("/:id/employees", floorController.getListEmployeeByFloor);

  return router;
};

module.exports = floorRouter;
