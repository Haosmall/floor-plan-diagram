const express = require("express");
const floorController = require("../controllers/FloorController");
const router = express.Router();

const floorRouter = () => {
	router.post("", floorController.addFloor);
	router.put("/:id", floorController.updateFloor);
	router.delete("/:id", floorController.deleteFloor);
	router.get("/:id", floorController.getFloorById);
	router.get("/:id/shapes", floorController.getLitShapeByFloor);

	return router;
};

module.exports = floorRouter;
