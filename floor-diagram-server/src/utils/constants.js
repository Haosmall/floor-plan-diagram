const ROLE = {
	anonymous: "anonymous",
	admin: "admin",
	member: "member",
	buildingAdmin: "building-admin",
	floorAdmin: "floor-admin",
};

const ADMIN = {
	name: "admin",
	username: "admin",
	password: "123456",
	isAdmin: true,
};

const USER = {
	name: "user",
	username: "user",
	password: "123456",
};

const CACHE_VALUE = {};

module.exports = { ROLE, ADMIN, USER, CACHE_VALUE };
