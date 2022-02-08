const Building = require("../models/Building");
const mongoose = require("mongoose");
const UserPlace = require("../models/UserPlace");
const Project = require("../models/Project");
const Shape = require("../models/Shape");
const ObjectId = mongoose.Types.ObjectId;

class ProjectService {
	async getListProjectByBuilding(buildingId) {
		const listProjects = await Project.aggregate([
			{
				$lookup: {
					from: "groups",
					localField: "groupId",
					foreignField: "_id",
					as: "group",
				},
			},
			{
				$match: {
					"group.buildingId": ObjectId(buildingId),
				},
			},
		]);

		// console.log(listProjects);
		return listProjects;
	}

	async addProject(projectInfo) {
		const project = new Project(projectInfo);
		const newProject = project.save(project);
		return newProject;
	}

	async updateProject(_id, projectInfo) {
		await Project.updateOne({ _id: ObjectId(_id) }, projectInfo);
		return { _id, ...projectInfo };
	}

	async deleteProject(_id) {
		await Project.deleteOne({ _id });
	}

	async getShapesByProject(projectId) {
		const result = await Shape.aggregate([
			{
				$match: {
					projectId: ObjectId(projectId),
				},
			},
			{
				$project: {
					_id: 1,
				},
			},
		]);
		const listShapes = result.map((ele) => ele._id);
		return listShapes;
	}
}

module.exports = new ProjectService();
