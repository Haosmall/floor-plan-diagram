const Building = require("../models/Building");
const mongoose = require("mongoose");
const UserPlace = require("../models/UserPlace");
const ObjectId = mongoose.Types.ObjectId;

class BuildingService {
	async getListBuildings() {
		const listBuildings = await Building.aggregate([
			{
				$lookup: {
					from: "users",
					localField: "admin",
					foreignField: "_id",
					as: "admin",
				},
			},
			{
				$project: {
					_id: 1,
					name: 1,
					admin: { $arrayElemAt: ["$admin", 0] },
				},
			},
			{
				$project: {
					_id: 1,
					name: 1,
					admin: { _id: "$admin._id", name: "$admin.name" },
				},
			},
		]);

		return listBuildings;
	}

	async addBuilding(buildingInfo) {
		const building = new Building(buildingInfo);
		const newBuilding = building.save(building);
		return newBuilding;
	}

	async updateBuilding(_id, buildingInfo) {
		const building = await Building.updateOne({ _id }, buildingInfo);
	}

	async getBuildingById(_id) {
		const building = await await Building.aggregate([
			{
				$match: {
					_id: ObjectId(_id),
				},
			},
			{
				$lookup: {
					from: "floors",
					localField: "_id",
					foreignField: "buildingId",
					as: "floors",
				},
			},
		]);

		if (building.length <= 0) throw new Error("Building not found");
		return building[0];
	}

	async deleteBuilding(_id) {
		await Building.findByIdAndDelete(_id);
		await UserPlace.deleteMany({ buildingId: ObjectId(_id) });
	}
}

module.exports = new BuildingService();
