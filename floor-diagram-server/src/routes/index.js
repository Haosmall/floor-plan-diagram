const casbinAuth = require("../middlewares/casbinAuth");
const auth = require("../middlewares/auth");
const authRouter = require("./auth");
const userRouter = require("./user");
const buildingRouter = require("./building");
const floorRouter = require("./floor");
const groupRouter = require("./group");
const projectRouter = require("./project");
const shapeRouter = require("./shape");

const route = (app) => {
	app.use("/auth", authRouter());
	app.use("/users", auth, userRouter());
	app.use("/buildings", auth, casbinAuth, buildingRouter());
	app.use("/floor", auth, casbinAuth, floorRouter());
	app.use("/groups", auth, casbinAuth, groupRouter());
	app.use("/projects", auth, casbinAuth, projectRouter());
	app.use("/shape", auth, casbinAuth, shapeRouter());
};
module.exports = route;
