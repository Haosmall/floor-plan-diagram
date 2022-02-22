const casbinAuth = require("../middleware/casbinAuth");
const auth = require("../middleware/auth");
const authRouter = require("./auth");
const userRouter = require("./user");
const buildingRouter = require("./building");
const floorRouter = require("./floor");
const groupRouter = require("./group");
const projectRouter = require("./project");
const shapeRouter = require("./shape");
const healthRouter = require("./health");

const route = (app) => {
	app.use("/api/auth", authRouter());
	app.use("/api/users", auth, userRouter());
	app.use("/api/buildings", auth, casbinAuth, buildingRouter());
	app.use("/api/floor", auth, casbinAuth, floorRouter());
	app.use("/api/groups", auth, casbinAuth, groupRouter());
	app.use("/api/projects", auth, casbinAuth, projectRouter());
	app.use("/api/shape", auth, casbinAuth, shapeRouter());
	app.use("/api/health", healthRouter());
};
module.exports = route;
