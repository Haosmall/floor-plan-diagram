const groupService = require("../services/GroupService");

class GroupController {
	// [POST] /groups
	async addGroup(req, res, next) {
		try {
			const response = await groupService.addGroup(req.body);

			res.status(201).json(response);
		} catch (err) {
			next(err);
		}
	}

	// [PUT] /groups/:id
	async updateGroup(req, res, next) {
		try {
			const response = await groupService.updateGroup(req.params.id, req.body);
			res.status(200).json(response);
		} catch (err) {
			next(err);
		}
	}

	// [DELETE] /groups/:id
	async deleteGroup(req, res, next) {
		try {
			const response = await groupService.deleteGroup(req.params.id);
			res.status(204).json(response);
		} catch (err) {
			next(err);
		}
	}

	// [GET] /groups/:id/shapes
	async getShapesByGroup(req, res, next) {
		try {
			const response = await groupService.getShapesByGroup(req.params.id);

			res.status(200).json(response);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new GroupController();
