const { isAdmin, isAdmin_or_buildingAdmin } = require("../middleware/auth");
const adminRouter = require("./admin");
const employeeRouter = require("./employee");
const roomRouter = require("./room");
const buildingRouter = require("./building");
const floorRouter = require("./floor");
const groupRouter = require("./group");
const teamRouter = require("./team");
const projectRouter = require("./project");

const route = (app) => {
	app.use("/api/admin", adminRouter());
	app.use("/api/buildings", isAdmin, buildingRouter());
	app.use("/api/employees", isAdmin_or_buildingAdmin, employeeRouter());
	app.use("/api/floors", isAdmin_or_buildingAdmin, floorRouter());
	app.use("/api/rooms", isAdmin_or_buildingAdmin, roomRouter());
	app.use("/api/groups", isAdmin_or_buildingAdmin, groupRouter());
	app.use("/api/teams", isAdmin_or_buildingAdmin, teamRouter());
	app.use("/api/projects", isAdmin_or_buildingAdmin, projectRouter());
};
module.exports = route;
