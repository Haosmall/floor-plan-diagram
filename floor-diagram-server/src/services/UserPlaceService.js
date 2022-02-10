const UserPlace = require("../models/UserPlace");

class UserPlaceService {
	async addUserPlace(userId, floorId, buildingId) {
		const userPlace = new UserPlace({ userId, floorId, buildingId });
		const newUserPlace = userPlace.save(userPlace);
		return newUserPlace;
	}

	async updateUserPlace(_id, userId, floorId, buildingId) {
		await UserPlace.updateOne({ _id }, { userId, floorId, buildingId });
	}

	async deleteUserPlace(_id) {
		await UserPlace.deleteOne({ _id });
	}
}

module.exports = new UserPlaceService();
