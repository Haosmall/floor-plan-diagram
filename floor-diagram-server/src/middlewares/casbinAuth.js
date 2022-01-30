const User = require("../models/User");
const { ROLE } = require("../utils/constants");
const { newEnforcer } = require("casbin");
const path = require("path");

const casbinAuth = async (req, res, next) => {
	const user = await User.findById(req._id);

	const role = user?.role || ROLE.anonymous;

	const __dirname = path.resolve();
	const enforcer = await newEnforcer(
		path.join(__dirname, "src", "config", "casbin", "model.conf"),
		path.join(__dirname, "src", "config", "casbin", "policy.csv")
	);

	const sub = req.query.sub || role;
	const obj = req.query.obj || req.originalUrl;
	const act = req.query.act || req.method;

	const result = await enforcer.enforce(sub, obj, act);

	if (result) {
		next();
	} else {
		res
			.status(403)
			.send({ status: 403, message: `${sub} cannot ${act} on ${obj}` });
	}
};

module.exports = casbinAuth;
