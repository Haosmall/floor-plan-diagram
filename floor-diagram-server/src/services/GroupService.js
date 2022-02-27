const mongoose = require("mongoose");
const Group = require("../models/Group");
const Project = require("../models/Project");
const ObjectId = mongoose.Types.ObjectId;

class GroupService {
	async getListGroupByBuilding(buildingId) {
		const listGroups = await Group.find({ buildingId }).select(["-__v"]);

		return listGroups;
	}

	async addGroup(groupInfo) {
		const group = new Group(groupInfo);
		const newGroup = group.save(group);
		return newGroup;
	}

	async updateGroup(_id, groupInfo) {
		await Group.updateOne({ _id: ObjectId(_id) }, groupInfo);
		return { _id, ...groupInfo };
	}

	async deleteGroup(_id) {
		await Group.deleteOne({ _id: ObjectId(_id) });
		await Project.deleteMany({ groupId: ObjectId(_id) });
	}

	async getShapesByGroup(groupId) {
		const result = await Project.aggregate([
			{
				$match: { groupId: ObjectId(groupId) },
			},
			{
				$lookup: {
					from: "shapes",
					localField: "_id",
					foreignField: "projectId",
					as: "result",
				},
			},
			{ $unwind: "$result" },
			{ $project: { _id: "$result._id" } },
			{ $group: { _id: "$_id" } },
		]);
		const listShapes = result.map((ele) => ele._id);
		return listShapes;
	}
}

module.exports = new GroupService();
