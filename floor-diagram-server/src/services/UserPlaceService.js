const UserPlace = require("../models/UserPlace");

class UserPlaceService {
	async addUserPlace(userId, floorId, buildingId, role) {
		const userPlace = new UserPlace({ userId, floorId, buildingId, role });
		const newUserPlace = userPlace.save(userPlace);
		return newUserPlace;
	}

	async updateUserPlace(_id, userId, floorId, buildingId, role) {
		await UserPlace.updateOne({ _id }, { userId, floorId, buildingId, role });
	}

	async deleteUserPlace(_id) {
		await UserPlace.deleteOne({ _id });
	}
}

module.exports = new UserPlaceService();
