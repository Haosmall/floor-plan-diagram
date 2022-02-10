const app = require("..");
const request = require("supertest");
const { CACHE_VALUE } = require("../utils/constants");
const importData = require("../utils/importData");
const Project = require("../models/Project");

beforeAll(async () => {
	await importData();
});

test("Should add valid project", async () => {
	const response = await request(app)
		.post("/projects/")
		.send({
			title: "project 3",
			groupId: CACHE_VALUE.groupId2,
		})
		.query({ groupId: CACHE_VALUE.groupId2 })
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser2}`)
		.expect(201);

	CACHE_VALUE.projectId3 = response._body._id.toString();
});

test("Should add invalid project", async () => {
	const response = await request(app)
		.post("/projects/")
		.query({ groupId: CACHE_VALUE.groupId2 })
		.send({
			title: "project 3",
			groupId: "wrong-group-id",
		})
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser2}`)
		.expect(400);
});

test("Should update valid project", async () => {
	const response = await request(app)
		.put(`/projects/${CACHE_VALUE.projectId3}/`)
		.send({
			title: "project 3 update",
			groupId: CACHE_VALUE.groupId1,
		})
		.query({ buildingId: CACHE_VALUE.buildingId1 })
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser2}`)
		.expect(200);
});

test("Should update invalid project", async () => {
	const response = await request(app)
		.put(`/projects/${CACHE_VALUE.projectId3}/`)
		.send({
			title: "project 3 update",
			groupId: "wrong-group-id",
		})
		.query({ buildingId: CACHE_VALUE.buildingId1 })
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser2}`)
		.expect(400);
});

test("Should delete project", async () => {
	const response = await request(app)
		.delete(`/projects/${CACHE_VALUE.projectId3}/`)
		.query({ projectId: CACHE_VALUE.projectId3 })
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser2}`)
		.expect(204);

	const group = await Project.findById(CACHE_VALUE.projectId3);

	expect(group).toBeNull();
});

test("Should get shapes by project", async () => {
	const response = await request(app)
		.get(`/projects/${CACHE_VALUE.projectId1}/shapes/`)
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser2}`)
		.expect(200);
	expect(response._body.length).toBe(2);
});
