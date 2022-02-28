const mongoose = require("mongoose");
const { dirname, join } = require("path");
require("dotenv").config({
  path: join(__dirname, "..", "..", ".env"),
});

const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
const DATABASE_PORT = process.env.DATABASE_PORT || 27017;
const DATABASE_NAME = process.env.DATABASE_NAME || "floor-diagram-db";

const MONGODB_URL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/floor-diagram-db";

const connect = async () => {
  try {
    await mongoose.connect(
      `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Databased connected successfully");
  } catch (error) {
    console.error("connect fail", error);
  }
};

module.exports = { connect };
