const app = require("..");
const User = require("../models/User");
const request = require("supertest");
const mongoose = require("mongoose");
const tokenUtils = require("../utils/tokenUtils");
const Building = require("../models/Building");
const { ADMIN, USER, CACHE_VALUE } = require("../utils/constants");
const importData = require("../utils/importData");

beforeAll(async () => {
	await importData();
});

test("Should get list building by admin", async () => {
	const response = await request(app)
		.get("/buildings/")
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser1}`)
		.expect(200);

	expect(response._body.length).toBe(2);
});

test("Should get list building by user", async () => {
	const response = await request(app)
		.get("/buildings/")
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser2}`)
		.expect(200);

	expect(response._body.length).toBe(1);
});

test("Should add valid building", async () => {
	const response = await request(app)
		.post("/buildings/")
		.send({
			name: "building 3",
			admin: CACHE_VALUE.userId1,
		})
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser1}`)
		.expect(201);
});

test("Should add invalid building", async () => {
	const response = await request(app)
		.post("/buildings/")
		.send({
			name: "building 4",
		})
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser1}`)
		.expect(400);
});

test("Should add building without authorization", async () => {
	const response = await request(app)
		.post("/buildings/")
		.send({
			name: "building 5",
		})
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser2}`)
		.expect(403);
});
