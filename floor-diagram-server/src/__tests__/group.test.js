const app = require("..");
const request = require("supertest");
const { CACHE_VALUE } = require("../utils/constants");
const importData = require("../utils/importData");
const Group = require("../models/Group");

beforeAll(async () => {
	await importData();
});

test("Should add valid project", async () => {
	const response = await request(app)
		.post("/projects/")
		.send({
			title: "project 3",
			buildingId: CACHE_VALUE.buildingId2,
		})
		.query({ buildingId: CACHE_VALUE.buildingId2 })
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser2}`)
		.expect(201);

	CACHE_VALUE.groupId3 = response._body._id.toString();
});

test("Should add invalid group", async () => {
	const response = await request(app)
		.post("/groups/")
		.query({ buildingId: CACHE_VALUE.buildingId2 })
		.send({
			title: "group 3",
			buildingId: "wrong-building-id",
		})
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser2}`)
		.expect(400);
});

test("Should update valid group", async () => {
	const response = await request(app)
		.put(`/groups/${CACHE_VALUE.groupId3}/`)
		.send({
			title: "group 3",
			buildingId: CACHE_VALUE.buildingId1,
		})
		.query({ buildingId: CACHE_VALUE.buildingId1 })
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser2}`)
		.expect(200);
});

test("Should update invalid group", async () => {
	const response = await request(app)
		.put(`/groups/${CACHE_VALUE.groupId3}/`)
		.send({
			title: "group 3",
			buildingId: "wrong-building-id",
		})
		.query({ buildingId: CACHE_VALUE.buildingId1 })
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser2}`)
		.expect(400);
});

test("Should delete group", async () => {
	const response = await request(app)
		.delete(`/groups/${CACHE_VALUE.groupId3}/`)
		.query({ groupId: CACHE_VALUE.groupId3 })
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser2}`)
		.expect(204);

	const group = await Group.findById(CACHE_VALUE.groupId3);

	expect(group).toBeNull();
});

test("Should get shapes by group", async () => {
	const response = await request(app)
		.get(`/groups/${CACHE_VALUE.groupId1}/shapes/`)
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser2}`)
		.expect(200);
	expect(response._body.length).toBe(2);
});
