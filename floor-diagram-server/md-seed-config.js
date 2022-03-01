const mongoose = require("mongoose");

const AdminSeeder = require("./seeders/admin.seeder");

const mongoURL =
	process.env.MONGODB_URL || "mongodb://localhost:27017/floor-diagram-db";

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
module.exports = seedersList = {
	AdminSeeder,
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
module.exports = connect = async () =>
	await mongoose.connect(mongoURL, { useNewUrlParser: true });
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
module.exports = dropdb = async () => mongoose.connection.db.dropDatabase();
