const User = require("../models/User");
const tokenUtils = require("../utils/tokenUtils");
const { registerValidator, loginValidator } = require("../validations/auth");

class AuthService {
	async registry(userInfo) {
		const { error } = registerValidator(userInfo);
		if (error) throw new Error(error.details[0].message);

		const checkEmailExist = await User.findOne({ username: userInfo.username });
		if (checkEmailExist) throw new Error("Email is exist");

		const newUser = new User(userInfo);
		const { _id, name, username, isAdmin } = await newUser.save();
		const token = await this.generateAndUpdateAccessToken(_id);

		return { _id, username, name, isAdmin, ...token };
	}

	async login(account) {
		const { error } = loginValidator(account);
		if (error) throw new Error(error.details[0].message);

		console.log(account);
		const { _id, name, username, isAdmin } = await User.findByCredentials(
			account.username,
			account.password
		);
		const token = await this.generateAndUpdateAccessToken(_id);

		return { _id, username, name, isAdmin, ...token };
	}

	async generateAndUpdateAccessToken(_id) {
		const token = await tokenUtils.generateToken({ _id });

		return {
			token,
		};
	}
}

module.exports = new AuthService();
