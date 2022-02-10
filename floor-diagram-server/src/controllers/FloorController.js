const floorService = require("../services/FloorService");
const shapeService = require("../services/ShapeService");

class FloorController {
	// [POST] /floor
	async addFloor(req, res, next) {
		try {
			const response = await floorService.addFloor(req.body);
			res.status(201).json(response);
		} catch (err) {
			next(err);
		}
	}

	// [PUT] /floor/:id
	async updateFloor(req, res, next) {
		try {
			const response = await floorService.updateFloor(req.params.id, req.body);
			res.status(200).json(response);
		} catch (err) {
			next(err);
		}
	}

	// [DELETE] /floor/:id
	async deleteFloor(req, res, next) {
		try {
			const response = await floorService.deleteFloor(req.params.id);
			res.status(204).json(response);
		} catch (err) {
			next(err);
		}
	}

	// [GET] /floor/:id
	async getFloorById(req, res, next) {
		try {
			const response = await floorService.getFloorById(req.params.id);
			res.status(200).json(response);
		} catch (err) {
			next(err);
		}
	}

	// [GET] /floor/:id/shapes
	async getLitShapeByFloor(req, res, next) {
		try {
			const response = await shapeService.getListShapeByFloor(req.params.id);
			res.status(200).json(response);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new FloorController();
