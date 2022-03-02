const { isAdmin, isAdmin_or_buildingAdmin } = require("../middleware/auth");
const adminRouter = require("./admin");
const employeesRouter = require("./employees");
const roomRouter = require("./room");
const buildingRouter = require("./building");
const floorRouter = require("./floor");
const groupRouter = require("./group");
const teamRouter = require("./team");
const projectRouter = require("./project");
const shapeRouter = require("./shape");

const route = (app) => {
  app.use("/api/admin", adminRouter());
  app.use("/api/buildings", isAdmin_or_buildingAdmin, buildingRouter());
  app.use("/api/employees", isAdmin_or_buildingAdmin, employeesRouter());
  app.use("/api/floors", isAdmin_or_buildingAdmin, floorRouter());
  app.use("/api/rooms", isAdmin_or_buildingAdmin, roomRouter());
  app.use("/api/groups", isAdmin_or_buildingAdmin, groupRouter());
  app.use("/api/teams", isAdmin_or_buildingAdmin, teamRouter());
  app.use("/api/projects", isAdmin_or_buildingAdmin, projectRouter());
  app.use("/api/shapes", isAdmin_or_buildingAdmin, shapeRouter());
};

module.exports = route;
