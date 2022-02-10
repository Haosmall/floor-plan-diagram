const app = require("..");
const request = require("supertest");
const { CACHE_VALUE } = require("../utils/constants");
const importData = require("../utils/importData");
const Project = require("../models/Project");
const Shape = require("../models/Shape");

beforeAll(async () => {
	await importData();
});

test("Should add valid shape", async () => {
	const response = await request(app)
		.post("/shape/")
		.send({
			type: "rect",
			floorId: CACHE_VALUE.floorId2,
			projectId: CACHE_VALUE.projectId2,
		})
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser2}`)
		.expect(201);

	CACHE_VALUE.shapeId3 = response._body._id.toString();
});

test("Should add invalid shape", async () => {
	const response = await request(app)
		.post("/shape/")
		.send({
			type: "rect",
			floorId: "wrong-floor-id",
		})
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser2}`)
		.expect(400);
});

test("Should update valid shape", async () => {
	const response = await request(app)
		.put(`/shape/${CACHE_VALUE.shapeId3}/`)
		.send({
			floorId: CACHE_VALUE.floorId2,
			projectId: CACHE_VALUE.projectId1,
		})
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser2}`)
		.expect(200);
});

test("Should update invalid shape", async () => {
	const response = await request(app)
		.put(`/shape/${CACHE_VALUE.shapeId3}/`)
		.send({
			floorId: "wrong-floor-id",
		})
		.query({ buildingId: CACHE_VALUE.buildingId1 })
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser2}`)
		.expect(400);
});

test("Should delete project", async () => {
	const response = await request(app)
		.delete(`/shape/${CACHE_VALUE.shapeId3}/`)
		.set("Authorization", `Bearer ${CACHE_VALUE.tokenUser2}`)
		.expect(204);

	const shape = await Shape.findById(CACHE_VALUE.shapeId3);

	expect(shape).toBeNull();
});
