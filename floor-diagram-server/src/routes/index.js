const { isAdmins } = require("../middleware/auth");
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
  app.use("/api/buildings", buildingRouter());
  app.use("/api/employees", employeesRouter());
  app.use("/api/floors", isAdmins, floorRouter());
  app.use("/api/rooms", isAdmins, roomRouter());
  app.use("/api/groups", isAdmins, groupRouter());
  app.use("/api/teams", isAdmins, teamRouter());
  app.use("/api/projects", isAdmins, projectRouter());
  app.use("/api/shapes", isAdmins, shapeRouter());
};

module.exports = route;
