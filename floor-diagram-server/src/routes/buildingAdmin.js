const express = require("express");
const buildingAdminController = require("../controllers/BuildingAdminController");
const router = express.Router();

const buildingAdminRouter = () => {
  router.post("/login", buildingAdminController.login);

  return router;
};

module.exports = buildingAdminRouter;
