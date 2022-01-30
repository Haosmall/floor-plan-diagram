const express = require("express");
const buildingController = require("../controllers/BuildingController");
const floorController = require("../controllers/FloorController");
const router = express.Router();

const buildingRouter = () => {
	router.get("", buildingController.getListBuildings);
	router.post("", buildingController.addBuilding);
	router.put("/:id", buildingController.updateBuilding);
	router.delete("/:id", buildingController.deleteBuilding);
	router.get("/:id", buildingController.getBuildingById);
	router.get("/:id/floors", buildingController.getFloorsByBuildingId);
	router.get("/:id/groups", buildingController.getListGroupByBuilding);
	router.get("/:id/projects", buildingController.getListProjectByBuilding);

	return router;
};

module.exports = buildingRouter;
