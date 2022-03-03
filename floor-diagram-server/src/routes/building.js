const express = require("express");
const { isAdmin, isAdmins } = require("../middleware/auth");
const buildingController = require("../controllers/BuildingController");
const router = express.Router();

const buildingRouter = () => {
  router.post("", isAdmin, buildingController.addBuilding);
  router.get("", isAdmins, buildingController.getListBuildings);
  router.get("/:id", isAdmins, buildingController.getBuildingById);
  router.put("/:id", isAdmin, buildingController.updateBuilding);
  router.delete("/:id", isAdmin, buildingController.deleteBuilding);
  router.get("/:id/floors", isAdmins, buildingController.getFloorsByBuildingId);
  router.get(
    "/:id/rooms",
    isAdmins,
    buildingController.getListRoomByBuildingId
  );
  router.get(
    "/:id/groups",
    isAdmins,
    buildingController.getListGroupByBuilding
  );
  router.get("/:id/teams", isAdmins, buildingController.getListTeamByBuilding);
  router.get(
    "/:id/projects",
    isAdmins,
    buildingController.getListProjectByBuilding
  );
  router.get(
    "/:id/employees",
    isAdmins,
    buildingController.getListEmployeeByBuilding
  );

  return router;
};

module.exports = buildingRouter;
