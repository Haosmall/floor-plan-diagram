const Building = require("../models/Building");
const User = require("../models/User");
const { ADMIN, USER, CACHE_VALUE } = require("./constants");
const tokenUtils = require("./tokenUtils");
const Floor = require("../models/Floor");
const Shape = require("../models/Shape");
const Project = require("../models/Project");
const Group = require("../models/Group");

const addUser = async () => {
	await User.deleteMany();
	const user = new User(ADMIN);
	await user.save();

	const user2 = new User(USER);
	await user2.save();

	CACHE_VALUE.userId1 = user._id.toString();
	CACHE_VALUE.userId2 = user2._id.toString();
};

const generateToken = async () => {
	CACHE_VALUE.tokenUser1 = await tokenUtils.generateToken(
		{ _id: CACHE_VALUE.userId1 },
		process.env.JWT_LIFE_ACCESS_TOKEN
	);

	CACHE_VALUE.tokenUser2 = await tokenUtils.generateToken(
		{ _id: CACHE_VALUE.userId2 },
		process.env.JWT_LIFE_ACCESS_TOKEN
	);
};

const addBuilding = async () => {
	await Building.deleteMany();

	const building = new Building({
		name: "building 1",
		admin: CACHE_VALUE.userId1,
	});
	await building.save();

	const building2 = new Building({
		name: "building 2",
		admin: CACHE_VALUE.userId2,
	});
	await building2.save();

	CACHE_VALUE.buildingId1 = building._id.toString();
	CACHE_VALUE.buildingId2 = building2._id.toString();
};

const addFloor = async () => {
	await Floor.deleteMany();

	const floor = new Floor({
		name: "floor 1",
		admin: CACHE_VALUE.userId1,
		users: [{ userId: CACHE_VALUE.userId2, role: "member" }],
		buildingId: CACHE_VALUE.buildingId2,
	});
	await floor.save();

	const floor2 = new Floor({
		name: "floor 2",
		admin: CACHE_VALUE.userId2,
		users: [{ userId: CACHE_VALUE.userId1, role: "member" }],
		buildingId: CACHE_VALUE.buildingId2,
	});
	await floor2.save();

	CACHE_VALUE.floorId1 = floor._id.toString();
	CACHE_VALUE.floorId2 = floor2._id.toString();
};

const addGroup = async () => {
	await Group.deleteMany();

	const group = new Group({
		title: "group 1",
		buildingId: CACHE_VALUE.buildingId1,
	});
	await group.save();

	const group2 = new Group({
		title: "group 2",
		buildingId: CACHE_VALUE.buildingId2,
	});
	await group2.save();

	CACHE_VALUE.groupId1 = group._id.toString();
	CACHE_VALUE.groupId2 = group2._id.toString();
};

const addProject = async () => {
	await Project.deleteMany();

	const project = new Project({
		title: "project 1",
		groupId: CACHE_VALUE.groupId1,
	});
	await project.save();

	const project2 = new Project({
		title: "project 2",
		groupId: CACHE_VALUE.groupId1,
	});
	await project2.save();

	CACHE_VALUE.projectId1 = project._id.toString();
	CACHE_VALUE.projectId2 = project2._id.toString();
};

const addShape = async () => {
	await Shape.deleteMany();

	const shape = new Shape({
		type: "circle",
		floorId: CACHE_VALUE.floorId1,
		projectId: CACHE_VALUE.projectId1,
	});
	await shape.save();

	const shape2 = new Shape({
		x: 200,
		y: 200,
		floorId: CACHE_VALUE.floorId1,
		projectId: CACHE_VALUE.projectId1,
	});
	await shape2.save();

	CACHE_VALUE.shapeId1 = shape._id.toString();
	CACHE_VALUE.shapeId2 = shape2._id.toString();
};

const importData = async () => {
	await addUser();
	await generateToken();
	await addBuilding();
	await addFloor();
	await addGroup();
	await addProject();
	await addShape();
};

module.exports = importData;
