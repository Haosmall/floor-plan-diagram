const express = require("express");
const shapeController = require("../controllers/ShapeController");
const router = express.Router();
const request = require("request");

var testResults = { status: 200 };

const SERVER_PORT = process.env.SERVER_PORT || 5000;

const URL = `http://localhost:${SERVER_PORT}/`;

const healthRouter = () => {
	router.get("", async (req, res, next) => {
		try {
			// const response = await shapeService.addShape(req.body);

			// res.status(200).json(response);

			// const healthcheck = {
			// 	uptime: process.uptime(),
			// 	message: "OK",
			// 	timestamp: Date.now(),
			// };
			// res.status(200).json(healthcheck);

			request(URL, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					console.log(body); // Print the google web page.
				}
			});

			await testRunner();
			res.status(testResults.status).json(testResults);
		} catch (err) {
			next(err);
		}
	});
	return router;
};

const databaseTest = () =>
	new Promise((resolve) => {
		setTimeout(() => {
			console.log("db test running");
			resolve({
				message: "OK",
				timestamp: Date.now(),
			});
		}, 1000);
	});

const testRunner = async (req, next) => {
	testResults.database = await databaseTest();
	if (testResults.database.message !== "OK") {
		testResults.status = 500;
	}
	// testResults.network = await networkTest();
	// if (testResults.network.message !== "OK") {
	// 	testResults.status = 500;
	// }
	// etc...
};

module.exports = healthRouter;
