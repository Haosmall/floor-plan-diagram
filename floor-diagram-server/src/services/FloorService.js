const Floor = require("../models/Floor");
const UserPlace = require("../models/UserPlace");
const userPlaceService = require("./UserPlaceService");
const mongoose = require("mongoose");
const Shape = require("../models/Shape");
const ObjectId = mongoose.Types.ObjectId;

class FloorService {
	async getListFloorsByBuildingId(buildingId) {
		const listFloors = await Floor.aggregate([
			{
				$match: {
					buildingId: ObjectId(buildingId),
				},
			},
			{
				$lookup: {
					from: "userplaces",
					localField: "_id",
					foreignField: "floorId",
					as: "users",
				},
			},
			{
				$project: {
					users: { createdAt: 0, updatedAt: 0, __v: 0 },
					createdAt: 0,
					updatedAt: 0,
					__v: 0,
				},
			},
			// {
			// 	$unwind: "$users",
			// },
			// {
			// 	$lookup: {
			// 		from: "users",
			// 		localField: "users.userId",
			// 		foreignField: "_id",
			// 		as: "user",
			// 	},
			// },
			// {
			// 	$unwind: "$user",
			// },
			// {
			// 	$project: {
			// 		_id: 1,
			// 		name: 1,
			// 		buildingId: 1,
			// 		admin: 1,
			// 		user: {
			// 			userId: "$user._id",
			// 			name: "$user.name",
			// 			role: "$users.role",
			// 		},
			// 	},
			// },
			// {
			// 	$group: {
			// 		_id: "$_id",
			// 		name: { $first: "$name" },
			// 		buildingId: { $first: "$buildingId" },
			// 		admin: { $first: "$admin" },
			// 		users: { $push: "$user" },
			// 	},
			// },
		]);

		// const listFloors = [];

		// if (result.length > 0) {
		// 	for (const floor of result) {
		// 		const { _id, name, buildingId, admin } = floor;

		// 		console.log({ uu: floor.users });
		// 		const users = floor.users.map((ele) => ele.userId);
		// 		listFloors.push({ _id, name, buildingId, admin, users });
		// 	}
		// }

		return listFloors;
	}

	async addFloor(floorInfo) {
		const { name, buildingId, admin, users } = floorInfo;

		const floor = new Floor({ name, buildingId, admin });
		const newFloor = await floor.save(floor);
		let userPlaces = [];

		if (users?.length > 0) {
			console.log({ users });
			for (const userId of users) {
				const userFloor = await userPlaceService.addUserPlace(
					userId,
					floor._id,
					floor.buildingId
				);
				userPlaces.push(userFloor);
			}
		}

		return {
			_id: newFloor._id,
			name: newFloor.name,
			buildingId: newFloor.buildingId,
			admin: newFloor.admin,
			users: userPlaces,
		};
	}

	async updateFloor(_id, floorInfo) {
		const { name, buildingId, admin, users } = floorInfo;
		await Floor.updateOne({ _id }, { name, buildingId, admin });
		const listUserPlace = await UserPlace.find({ floorId: ObjectId(_id) });

		// const userPlaceIds = users.map((ele) => ele._id);
		const listId = listUserPlace.map((ele) => ele._id.toString());

		const ListUserPlaceDelete = listId.filter((ele) => !users.includes(ele));

		const ListUserPlaceAdd = users.filter((ele) => !listId.includes(ele));

		if (ListUserPlaceDelete.length > 0) {
			for (const userPlaceId of ListUserPlaceDelete) {
				await userPlaceService.deleteUserPlace(userPlaceId);
			}
		}

		if (ListUserPlaceAdd.length > 0) {
			for (const userId of ListUserPlaceAdd) {
				await userPlaceService.addUserPlace(userId, _id, buildingId);
			}
		}

		const userPlaces = await UserPlace.find({ floorId: ObjectId(_id) });

		return {
			_id,
			name,
			buildingId,
			admin,
			users: userPlaces,
		};
	}

	async deleteFloor(_id) {
		await Floor.findByIdAndDelete(_id);
		await UserPlace.deleteMany({ floorId: ObjectId(_id) });
		await Shape.deleteMany({ floorId: ObjectId(_id) });
	}

	async getFloorById(_id) {
		return await Floor.findById(_id);
	}
}

module.exports = new FloorService();
