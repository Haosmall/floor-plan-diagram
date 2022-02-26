// const casbinAuth = require("../middleware/casbinAuth");
const { isAdmin, isAdmin_or_buildingAdmin } = require("../middleware/auth");
const adminRouter = require("./admin");
const employeeRouter = require("./employee");
// const authRouter = require("./auth");
// const userRouter = require("./user");
const buildingRouter = require("./building");
const floorRouter = require("./floor");
// const groupRouter = require("./group");
// const projectRouter = require("./project");
// const shapeRouter = require("./shape");
// const healthRouter = require("./health");

const route = (app) => {
  app.use("/api/admin", adminRouter());
  app.use("/api/employees", isAdmin_or_buildingAdmin, employeeRouter());
  app.use("/api/buildings", isAdmin, buildingRouter());
  app.use("/api/floors", isAdmin_or_buildingAdmin, floorRouter());
  //   app.use("/api/auth", authRouter());
  //   app.use("/api/users", auth, userRouter());
  //   app.use("/api/groups", auth, casbinAuth, groupRouter());
  //   app.use("/api/projects", auth, casbinAuth, projectRouter());
  //   app.use("/api/shape", auth, casbinAuth, shapeRouter());
  //   app.use("/api/health", healthRouter());
};
module.exports = route;
