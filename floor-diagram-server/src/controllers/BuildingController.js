const buildingService = require("../services/BuildingService");
const floorService = require("../services/FloorService");
const groupService = require("../services/GroupService");
const projectService = require("../services/ProjectService");

class BuildingController {
	// [POST] /buildings
	async addBuilding(req, res, next) {
		try {
			const response = await buildingService.addBuilding(req.body);

			res.status(201).json(response);
		} catch (err) {
			next(err);
		}
	}

	// [PUT] /buildings
	async updateBuilding(req, res, next) {
		try {
			const response = await buildingService.updateBuilding(
				req.params.id,
				req.body
			);
			res.status(200).json(response);
		} catch (err) {
			next(err);
		}
	}

	// [DELETE] /buildings/:id
	async deleteBuilding(req, res, next) {
		try {
			const response = await buildingService.deleteBuilding(req.params.id);
			res.status(204).json(response);
		} catch (err) {
			next(err);
		}
	}

	// [GET] /buildings
	async getListBuildings(req, res, next) {
		try {
			const response = await buildingService.getListBuildings(req._id);
			res.status(200).json(response);
		} catch (err) {
			next(err);
		}
	}

	// [GET] /buildings/:id
	async getBuildingById(req, res, next) {
		try {
			const response = await buildingService.getBuildingById(req.params.id);
			res.status(200).json(response);
		} catch (err) {
			next(err);
		}
	}

	// [GET] /buildings/:id/floors
	async getFloorsByBuildingId(req, res, next) {
		try {
			const response = await floorService.getListFloorsByBuildingId(
				req.params.id
			);
			res.status(200).json(response);
		} catch (err) {
			next(err);
		}
	}

	// [GET] /buildings/:id/groups
	async getListGroupByBuilding(req, res, next) {
		try {
			const response = await groupService.getListGroupByBuilding(req.params.id);
			res.status(200).json(response);
		} catch (err) {
			next(err);
		}
	}

	// [GET] /buildings/:id/projects
	async getListProjectByBuilding(req, res, next) {
		try {
			const response = await projectService.getListProjectByBuilding(
				req.params.id
			);
			res.status(200).json(response);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new BuildingController();
