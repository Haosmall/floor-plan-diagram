const mongoose = require("mongoose");

const Admin = require("./seeders/admin.seeder");

const mongoURL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/floor-diagram-db";

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
exports.seedersList = {
  Admin,
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
exports.connect = async () =>
  await mongoose.connect(mongoURL, { useNewUrlParser: true });
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
exports.dropdb = async () => mongoose.connection.db.dropDatabase();
