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
		console.log({ listFloors });
		return listFloors;
	}

	async addFloor(floorInfo) {
		const { name, buildingId, admin, users } = floorInfo;

		const floor = new Floor({ name, buildingId, admin });
		const newFloor = await floor.save(floor);
		let userPlaces = [];

		if (users?.length > 0) {
			for (const user of users) {
				const userFloor = await userPlaceService.addUserPlace(
					user.userId,
					floor._id,
					floor.buildingId,
					user.role
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

		const userPlaceIds = users.map((ele) => ele._id);
		const listId = listUserPlace.map((ele) => ele._id.toString());

		const ListUserPlaceDelete = listId.filter(
			(ele) => !userPlaceIds.includes(ele)
		);
		const ListUserPlaceAdd = users.filter((ele) => !ele._id);
		const ListUserPlaceUpdate = users.filter(
			(ele) => !ListUserPlaceDelete.includes(ele._id)
		);

		if (ListUserPlaceDelete.length > 0) {
			for (const userPlaceId of ListUserPlaceDelete) {
				await userPlaceService.deleteUserPlace(userPlaceId);
			}
		}

		if (ListUserPlaceAdd.length > 0) {
			for (const userPlace of ListUserPlaceAdd) {
				await userPlaceService.addUserPlace(
					userPlace.userId,
					_id,
					buildingId,
					userPlace.role
				);
			}
		}

		if (ListUserPlaceUpdate.length > 0) {
			for (const userPlace of ListUserPlaceUpdate) {
				await userPlaceService.updateUserPlace(
					userPlace._id,
					userPlace.userId,
					_id,
					buildingId,
					userPlace.role
				);
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
