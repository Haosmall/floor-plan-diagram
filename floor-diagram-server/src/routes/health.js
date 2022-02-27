const express = require("express");
const userService = require("../services/UserService");
const router = express.Router();
const request = require("../utils/await-request");
const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
const util = require("util");
const awsS3Service = require("../services/AwsS3Service");

const SERVER_PORT = process.env.SERVER_PORT || 5000;

const URL = `http://localhost:${SERVER_PORT}/api/`;

const BucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const bucketPath = process.env.AWS_NAME_PATH;
const hostName = process.env.HOST_NAME;

const healthRouter = () => {
	router.get("", async (req, res, next) => {
		const testResults = { status: 200 };

		try {
			// ping webserver
			await webserverTest(testResults);
			// ping database
			await databaseTest(testResults);
			// ping AWS S3
			await awsS3Test(testResults);

			res.status(testResults.status).json(testResults);
		} catch (err) {
			next(err);
		}
	});

	router.get("/hello-world", async (req, res, next) => {
		try {
			res.status(200).json("Hello world");
		} catch (err) {
			next(err);
		}
	});

	return router;
};

const webserverTest = async (testResults) => {
	try {
		// const { statusCode } = await request(`${URL}users/me`);
		const { statusCode } = await request(`${URL}health/hello-world`);

		if (statusCode === 200 || statusCode === 201 || statusCode === 204) {
			testResults.webserver = "healthy";
		} else {
			testResults.webserver = "unhealthy";
		}

		testResults.status = statusCode;
	} catch (err) {
		next(err);
	}
};

const databaseTest = async (testResults) => {
	try {
		const users = await userService.getListUsers;
		testResults.database = "healthy";
	} catch (error) {
		console.error(error);
		testResults.status = 400;
		testResults.database = "unhealthy";
	}
};

const awsS3Test = async (testResults) => {
	try {
		const s3 = new S3({
			region,
			accessKeyId,
			secretAccessKey,
		});

		const readFile = util.promisify(fs.readFile);

		const data = await readFile("public/logo192.png");
		const base64data = new Buffer(data);

		const uploadParams = {
			Bucket: BucketName,
			Body: base64data,
			Key: `health/${Date.now()}-logo192.png`,
		};

		const { Location, Key } = await s3.upload(uploadParams).promise();

		await s3.deleteObject({ Bucket: BucketName, Key }).promise();

		testResults.AWS_S3 = "healthy";
	} catch (error) {
		console.error(error);
		testResults.status = 400;
		testResults.AWS_S3 = "unhealthy";
	}
};

module.exports = healthRouter;
