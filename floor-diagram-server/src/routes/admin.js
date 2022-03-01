const express = require("express");
const adminController = require("../controllers/AdminController");
const router = express.Router();

const adminRouter = () => {
  router.post("/registry", adminController.registry);
  router.post("/login", adminController.login);
  router.get("/me", adminController.getMe);

  return router;
};

module.exports = adminRouter;
