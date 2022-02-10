const app = require("..");
const User = require("../models/User");
const request = require("supertest");
const mongoose = require("mongoose");
const tokenUtils = require("../utils/tokenUtils");
const { ADMIN, USER, CACHE_VALUE } = require("../utils/constants");
const importData = require("../utils/importData");

beforeAll(async () => {
	await importData();
});

test("Should signup a new user", async () => {
	const response = await request(app)
		.post("/auth/registry")
		.send({
			name: "user1",
			username: "user1",
			password: "123456",
		})
		.expect(201);

	const token = response._body.token;

	expect(token).not.toBeNull();
	expect(token).not.toBeUndefined();

	const data = await tokenUtils.verifyToken(token);
	expect(data._id).not.toBeNull();
	expect(data._id).not.toBeUndefined();
});

test("Should login existing user", async () => {
	const response = await request(app)
		.post("/auth/login")
		.send({
			username: ADMIN.username,
			password: ADMIN.password,
		})
		.expect(200);

	const token = response._body.token;
	expect(token).not.toBeNull();
	expect(token).not.toBeUndefined();

	const data = await tokenUtils.verifyToken(token);
	expect(data._id).not.toBeNull();
	expect(data._id).not.toBeUndefined();

	CACHE_VALUE.tokenUser1 = token;
});

test("Should not login nonexistent user", async () => {
	const response = await request(app)
		.post("/auth/login")
		.send({
			username: ADMIN.username,
			password: "wrongpassword",
		})
		.expect(400);
});

test("should require authorization", async () => {
	const user = await User.find({ username: "nhathao" });
	const token = await tokenUtils.generateToken(
		{ _id: CACHE_VALUE.userId1 },
		process.env.JWT_LIFE_ACCESS_TOKEN
	);

	const response = await request(app)
		.get("/users/")
		.set("Authorization", `Bearer ${token}`)
		.expect(200);
	expect(response._body.length).toBe(3);
});

test("should get without authorization", async () => {
	await request(app).get("/users/me").expect(401);
});
