const User = require("../models/User");
const tokenUtils = require("../utils/tokenUtils");

const auth = async (req, res, next) => {
	try {
		const token = req.header("Authorization")?.replace("Bearer ", "");
		const data = await tokenUtils.verifyToken(token);

		const user = await User.findOne({
			_id: data._id,
		});
		const { createdAt } = data;

		if (!user || !createdAt) {
			throw new Error();
		}

		req._id = data._id;

		next();
	} catch (error) {
		console.log(error);
		res.status(401).send({
			status: 401,
			error: "Not authorized to access this resource",
		});
	}
};
module.exports = auth;
