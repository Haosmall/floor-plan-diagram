const mongoose = require("mongoose");
const { dirname, join } = require("path");
require("dotenv").config({
	path: join(dirname(require.main.filename), ".env"),
});

const MONGODB_URL =
	process.env.MONGODB_URL || "mongodb://localhost:27017/floor-diagram-db";

const connect = async () => {
	try {
		await mongoose.connect(MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		// console.log("connect successfully");
	} catch (error) {
		// console.log("connect fail", error);
	}
};

module.exports = { connect };
