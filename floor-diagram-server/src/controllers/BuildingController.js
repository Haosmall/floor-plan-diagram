const buildingService = require("../services/BuildingService");

class BuildingController {
  // [POST] /api/buildings
  async addBuilding(req, res, next) {
    try {
      const response = await buildingService.addBuilding(req.body);

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/buildings
  async getListBuildings(req, res, next) {
    try {
      const response = await buildingService.getListBuildings();

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/buildings/:id
  async getBuildingById(req, res, next) {
    try {
      const response = await buildingService.getBuildingById(req.params.id);

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [PUT] /api/buildings/:id
  async updateBuilding(req, res, next) {
    try {
      const response = await buildingService.updateBuilding(
        req.params.id,
        req.body
      );
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [DELETE] /api/buildings/:id
  async deleteBuilding(req, res, next) {
    try {
      const response = await buildingService.deleteBuilding(req.params.id);

      res.status(204).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/buildings/:id/floors
  async getFloorsByBuildingId(req, res, next) {
    try {
      const response = await buildingService.getFloorsByBuildingId(
        req.params.id
      );
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/buildings/:id/rooms
  async getListRoomByBuildingId(req, res, next) {
    try {
      const response = await buildingService.getListRoomByBuildingId(
        req.params.id
      );
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/buildings/:id/groups
  async getListGroupByBuilding(req, res, next) {
    try {
      const response = await buildingService.getListGroupByBuilding(
        req.params.id
      );
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/buildings/:id/teams
  async getListTeamByBuilding(req, res, next) {
    try {
      const response = await buildingService.getListTeamByBuilding(
        req.params.id
      );
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/buildings/:id/projects
  async getListProjectByBuilding(req, res, next) {
    try {
      const response = await buildingService.getListProjectByBuilding(
        req.params.id
      );
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/buildings/:id/employees
  async getListEmployeeByBuilding(req, res, next) {
    try {
      const response = await buildingService.getListEmployeeByBuilding(
        req.params.id
      );
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new BuildingController();
