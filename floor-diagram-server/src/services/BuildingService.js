const Building = require("../models/Building");
const mongoose = require("mongoose");
const UserPlace = require("../models/UserPlace");
const User = require("../models/User");
const ObjectId = mongoose.Types.ObjectId;

class BuildingService {
	async getListBuildings(userId, name) {
		const isAdmin = await User.isAdmin(userId);

		// console.log({ userId });

		let listBuildings = [];

		if (isAdmin) {
			listBuildings = await Building.aggregate([
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
				{
					$match: {
						name: { $regex: name, $options: "i" },
					},
				},
			]);
		} else {
			const listBuildingsByUserPlace = await UserPlace.aggregate([
				{
					$match: {
						userId: ObjectId(userId),
					},
				},
				{
					$lookup: {
						from: "buildings",
						localField: "buildingId",
						foreignField: "_id",
						as: "result",
					},
				},
				{
					$unwind: "$result",
				},
				{
					$project: {
						_id: "$result._id",
						name: "$result.name",
						admin: "$result.admin",
					},
				},
				{
					$group: {
						_id: "$_id",
						name: { $first: "$name" },
						admin: { $first: "$admin" },
					},
				},
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

			const listBuildingByAdmin = await Building.aggregate([
				{
					$match: {
						admin: ObjectId(userId),
					},
				},
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

			const idTemps = [];

			[...listBuildingByAdmin, ...listBuildingsByUserPlace].map((ele) => {
				if (!idTemps.includes(ele._id.toString())) {
					idTemps.push(ele._id.toString());
					listBuildings.push(ele);
				}
			});
		}

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

	async searchBuildingByName(name) {
		const buildings = await await Building.aggregate([
			{
				$match: {
					name: { $regex: name, $options: "i" },
				},
			},
		]);

		return buildings;
	}
}

module.exports = new BuildingService();
