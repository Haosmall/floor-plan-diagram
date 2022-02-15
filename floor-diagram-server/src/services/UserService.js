const User = require("../models/User");
const tokenUtils = require("../utils/tokenUtils");
const { registerValidator, loginValidator } = require("../validations/auth");

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
}

module.exports = new UserService();
