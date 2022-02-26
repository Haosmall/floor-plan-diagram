const express = require("express");
const buildingController = require("../controllers/BuildingController");
const router = express.Router();

const buildingRouter = () => {
  router.post("", buildingController.addBuilding);
  router.get("", buildingController.getListBuildings);
  router.get("/:id", buildingController.getBuildingById);
  router.put("/:id", buildingController.updateBuilding);
  router.delete("/:id", buildingController.deleteBuilding);
  router.get("/:id/floors", buildingController.getFloorsByBuildingId);
  router.get("/:id/rooms", buildingController.getListRoomByBuildingId);
  router.get("/:id/groups", buildingController.getListGroupByBuilding);
  router.get("/:id/teams", buildingController.getListTeamByBuilding);
  router.get("/:id/projects", buildingController.getListProjectByBuilding);
  router.get("/:id/employees", buildingController.getListEmployeeByBuilding);

  return router;
};

module.exports = buildingRouter;
