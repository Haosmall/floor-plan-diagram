const express = require("express");
const adminController = require("../controllers/AdminController");
const router = express.Router();

const adminRouter = () => {
  router.get("", (req, res, next) => res.send("hello"));
  router.post("/registry", adminController.registry);
  router.post("/login", adminController.login);

  return router;
};

module.exports = adminRouter;
