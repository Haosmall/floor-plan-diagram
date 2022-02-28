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
  app.use("/api/employees", employeeRouter());
  app.use("/api/floors", floorRouter());
  app.use("/api/rooms", roomRouter());
  app.use("/api/groups", groupRouter());
  app.use("/api/teams", teamRouter());
  app.use("/api/projects", projectRouter());
};
module.exports = route;
