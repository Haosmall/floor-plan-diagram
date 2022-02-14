const User = require("../models/User");
const tokenUtils = require("../utils/tokenUtils");
const { registerValidator, loginValidator } = require("../validations/auth");

class UserService {
	async getListUsers() {
		const listUsers = await User.find({}).select(["-password", "-__v"]);
		return listUsers;
	}

	async getUserById(_id) {
		const user = await User.findOne({ _id }).select(["-password", "-__v"]);
		if (!user) throw new Error("User not found");
		return user;
	}

	async searchUserByName(name) {
		const users = await User.aggregate([
			{
				$match: {
					name: { $regex: name, $options: "i" },
				},
			},
		]);
		return users;
	}
}

module.exports = new UserService();
