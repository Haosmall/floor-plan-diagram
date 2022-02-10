const app = require("..");
const User = require("../models/User");
const request = require("supertest");
const mongoose = require("mongoose");
const tokenUtils = require("../utils/tokenUtils");
const Building = require("../models/Building");
const { ADMIN, USER, CACHE_VALUE } = require("../utils/constants");
const importData = require("../utils/importData");
const Floor = require("../models/Floor");

beforeAll(async () => {
	await importData();
});

test("Should add valid floor", async () => {
	const response = await request(app)
		.post("/floor/")
		.send({
			name: "floor 3",
			admin: CACHE_VALUE.userId2,
			buildingId: CACHE_VALUE.buildingId2,
			users: [CACHE_VALUE.userId1],
		})
		.query({ buildingId: CACHE_VALUE.buildingId2 })
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser2}`)
		.expect(201);

	CACHE_VALUE.floorId3 = response._body._id.toString();
});

test("Should add invalid floor", async () => {
	const response = await request(app)
		.post("/floor/")
		.query({ buildingId: CACHE_VALUE.buildingId2 })
		.send({
			name: "floor 3",
			admin: CACHE_VALUE.userId2,
			buildingId: "wrong-building-id",
			users: [CACHE_VALUE.userId1],
		})
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser2}`)
		.expect(400);
});

test("Should update valid floor", async () => {
	const response = await request(app)
		.put(`/floor/${CACHE_VALUE.floorId3}/`)
		.send({
			name: "floor 3",
			admin: CACHE_VALUE.userId1,
			buildingId: CACHE_VALUE.buildingId2,
			users: [CACHE_VALUE.userId1],
		})
		.query({ buildingId: CACHE_VALUE.buildingId2 })
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser2}`)
		.expect(200);
});

test("Should update invalid floor", async () => {
	const response = await request(app)
		.put(`/floor/${CACHE_VALUE.floorId3}/`)
		.send({
			name: "floor 3",
			admin: CACHE_VALUE.userId2,
			buildingId: "wrong-building-id",
			users: [CACHE_VALUE.userId1],
		})
		.query({ buildingId: CACHE_VALUE.buildingId2 })
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser2}`)
		.expect(400);
});

test("Should delete floor", async () => {
	const response = await request(app)
		.delete(`/floor/${CACHE_VALUE.floorId3}/`)
		.query({ buildingId: CACHE_VALUE.buildingId2 })
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser2}`)
		.expect(204);

	const floor = await Floor.findById(CACHE_VALUE.floorId3);

	expect(floor).toBeNull();
});

test("Should get existing floor", async () => {
	const response = await request(app)
		.get(`/floor/${CACHE_VALUE.floorId2}/`)
		.query({ floorId: CACHE_VALUE.floorId2 })
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser2}`)
		.expect(200);
});

test("Should get nonexisting floor", async () => {
	const response = await request(app)
		.get(`/floor/${CACHE_VALUE.floorId3}/`)
		.query({ floorId: CACHE_VALUE.floorId3 })
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser2}`)
		.expect(200);
	expect(response._body).toBeNull();
});

test("Should get shapes by floor", async () => {
	const response = await request(app)
		.get(`/floor/${CACHE_VALUE.floorId1}/shapes/`)
		.query({ floorId: CACHE_VALUE.floorId1 })
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser2}`)
		.expect(200);
	expect(response._body.length).toBe(2);
});
