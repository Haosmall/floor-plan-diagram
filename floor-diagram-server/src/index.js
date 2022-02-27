const express = require("express");
const routes = require("./routes");
const db = require("./config/db");
const handleErr = require("./middleware/handleErr");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));

// CORS
app.use(cors());

// loading routes
routes(app);

// Connect to db
db.connect();

const SERVER_PORT = process.env.SERVER_PORT || 5000;

// static file
app.use(express.static("public"));
// serve static resources
app.use("/uploads", express.static(path.join(path.resolve(), "/uploads")));

// display the client-side route page.
app.use((req, res, next) => {
	res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// start express server
if (process.env.NODE_ENV !== "test") {
	app.listen(SERVER_PORT, () => {
		console.log(`Server is running on port ${SERVER_PORT}`);
	});
}

// middleware handle error
app.use(handleErr);

module.exports = app;
