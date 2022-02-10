const projectService = require("../services/ProjectService");

class ProjectController {
	// [POST] /projects
	async addProject(req, res, next) {
		try {
			const response = await projectService.addProject(req.body);

			res.status(201).json(response);
		} catch (err) {
			next(err);
		}
	}

	// [PUT] /projects/:id
	async updateProject(req, res, next) {
		try {
			const response = await projectService.updateProject(
				req.params.id,
				req.body
			);
			res.status(200).json(response);
		} catch (err) {
			next(err);
		}
	}

	// [DELETE] /projects/:id
	async deleteProject(req, res, next) {
		try {
			const response = await projectService.deleteProject(req.params.id);
			res.status(204).json(response);
		} catch (err) {
			next(err);
		}
	}

	// [DELETE] /projects/:id/shapes
	async getShapesByProject(req, res, next) {
		try {
			const response = await projectService.getShapesByProject(req.params.id);
			res.status(200).json(response);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new ProjectController();
