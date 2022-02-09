// const app = require("..");
// const User = require("../models/User");
// const request = require("supertest");
// const mongoose = require("mongoose");
// const tokenUtils = require("../utils/tokenUtils");
// const Building = require("../models/Building");
// const { ADMIN, USER, CACHE_VALUE } = require("../utils/constants");

// beforeAll(async () => {
// 	await Building.deleteMany();

// 	CACHE_VALUE.tokenUser2 = await tokenUtils.generateToken(
// 		{ _id: CACHE_VALUE.userId2 },
// 		process.env.JWT_LIFE_ACCESS_TOKEN
// 	);

// 	const building = new Building({
// 		name: "new building 1",
// 		admin: CACHE_VALUE.userId1,
// 	});
// 	await building.save();

// 	const building2 = new Building({
// 		name: "new building 2",
// 		admin: CACHE_VALUE.userId2,
// 	});
// 	await building2.save();

// 	buildingId1 = building._id.toString();
// 	buildingId2 = building2._id.toString();
// });

// test("Should get list building by admin", async () => {
// 	const response = await request(app)
// 		.get("/buildings/")
// 		.set("Authorization", `Bearer ${tokenUser1}`)
// 		.expect(200);

// 	expect(response._body.length).toBe(2);
// });

// test("Should get list building by user", async () => {
// 	const response = await request(app)
// 		.get("/buildings/")
// 		.set("Authorization", `Bearer ${tokenUser2}`)
// 		.expect(200);

// 	expect(response._body.length).toBe(1);
// });

// test("Should add valid building", async () => {
// 	const response = await request(app)
// 		.post("/buildings/")
// 		.send({
// 			name: "building 3",
// 			admin: userOneId,
// 		})
// 		.set("Authorization", `Bearer ${tokenUser1}`)
// 		.expect(201);
// });

// test("Should add invalid building", async () => {
// 	const response = await request(app)
// 		.post("/buildings/")
// 		.send({
// 			name: "building 4",
// 		})
// 		.set("Authorization", `Bearer ${tokenUser1}`)
// 		.expect(400);
// });

// test("Should add building without authorization", async () => {
// 	const response = await request(app)
// 		.post("/buildings/")
// 		.send({
// 			name: "building 5",
// 		})
// 		.set("Authorization", `Bearer ${tokenUser2}`)
// 		.expect(403);
// });
