const User = require("../models/User");
const tokenUtils = require("../utils/tokenUtils");
const { registerValidator, loginValidator } = require("../validations/auth");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

class UserService {
	async getListUsers(name) {
		const listUsers = await User.aggregate([
			{
				$match: {
					name: { $regex: name, $options: "i" },
				},
			},
			{
				$project: {
					password: 0,
					__v: 0,
					createdAt: 0,
					updatedAt: 0,
				},
			},
		]);
		return listUsers;
	}

	async getUserById(_id) {
		const user = await User.findOne({ _id }).select([
			"-password",
			"-__v",
			"-createdAt",
			"-updatedAt",
		]);
		if (!user) throw new Error("User not found");
		return user;
	}

	async getListUserPlacesByUserId(_id) {
		const users = await User.aggregate([
			{
				$lookup: {
					from: "userplaces",
					localField: "_id",
					foreignField: "userId",
					as: "test",
				},
			},
		]);
		if (!users) throw new Error("User not found");
		return users;
	}
}

module.exports = new UserService();
