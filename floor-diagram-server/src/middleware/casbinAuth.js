const User = require("../models/User");
const { ROLE } = require("../utils/constants");
const { newEnforcer } = require("casbin");
const path = require("path");
const Building = require("../models/Building");
const Floor = require("../models/Floor");
const Group = require("../models/Group");
const Project = require("../models/Project");

const casbinAuth = async (req, res, next) => {
	const __dirname = path.resolve();

	const enforcer = await newEnforcer(
		path.join(__dirname, "src", "config", "casbin", "model.conf"),
		path.join(__dirname, "src", "config", "casbin", "policy.csv")
	);

	const sub = await getUserRole(req);
	const obj = req.originalUrl;
	const act = req.method;

	console.log({ sub, obj, act });

	const result = await enforcer.enforce(sub, obj, act);

	if (result) {
		next();
	} else {
		res
			.status(403)
			.send({ status: 403, message: `${sub} cannot ${act} on ${obj}` });
	}
};

const getUserRole = async (req) => {
	const userId = req._id;

	const { isAdmin } = await User.findById(userId);
	if (isAdmin) return ROLE.admin;

	const { buildingId, floorId, groupId, projectId } = req.query;

	if (buildingId) {
		if (isBuildingAdmin(buildingId, userId)) return ROLE.buildingAdmin;
	}

	if (floorId) {
		const role = await getRoleByFloorId(floorId, userId);

		if (role) return role;
	}

	if (groupId) {
		const role = await getRoleByGroupId(groupId);
		if (role) return role;
	}

	if (projectId) {
		const role = await getRoleByProjectId(groupId);
		if (role) return role;
	}

	return ROLE.member;
};

const isBuildingAdmin = async (buildingId, userId) => {
	const building = await Building.findById(buildingId);

	return building?.admin.toString() === userId;
};

const getRoleByFloorId = async (floorId, userId) => {
	const floor = await Floor.findById(floorId);

	if (isBuildingAdmin(floor?.buildingId, userId)) return ROLE.buildingAdmin;

	if (floor?.admin.toString() === userId) return ROLE.floorAdmin;

	return "";
};

const getRoleByGroupId = async (groupId) => {
	const building = await Group.findById(groupId);

	if (isBuildingAdmin(building?.buildingId)) return ROLE.buildingAdmin;

	return "";
};

const getRoleByProjectId = async (projectId) => {
	const group = await Project.findById(projectId);

	return await getRoleByGroupId(group?.groupId);
};

module.exports = casbinAuth;
