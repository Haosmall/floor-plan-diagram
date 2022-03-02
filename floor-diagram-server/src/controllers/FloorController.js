const floorService = require("../services/FloorService");

class FloorController {
  // [POST] /floors
  async addFloor(req, res, next) {
    try {
      const response = await floorService.addFloor(req.body);

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /floors
  async getListFloors(req, res, next) {
    try {
      const response = await floorService.getListFloors();

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /floors/:id
  async getFloorById(req, res, next) {
    try {
      const response = await floorService.getFloorById(req.params.id);

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [PUT] /floors/:id
  async updateFloor(req, res, next) {
    try {
      const response = await floorService.updateFloor(req.params.id, req.body);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [DELETE] /floors/:id
  async deleteFloor(req, res, next) {
    try {
      const response = await floorService.deleteFloor(req.params.id);

      res.status(204).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /floors/:id/rooms
  async getListRoomByFloorId(req, res, next) {
    try {
      const response = await floorService.getListRoomByFloorId(req.params.id);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /floors/:id/groups
  async getListGroupByFloor(req, res, next) {
    try {
      const response = await floorService.getListGroupByFloor(req.params.id);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /floors/:id/teams
  async getListTeamByFloor(req, res, next) {
    try {
      const response = await floorService.getListTeamByFloor(req.params.id);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /floors/:id/projects
  async getListProjectByFloor(req, res, next) {
    try {
      const response = await floorService.getListProjectByFloor(req.params.id);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /floors/:id/employees
  async getListEmployeeByFloor(req, res, next) {
    try {
      const response = await floorService.getListEmployeeByFloor(req.params.id);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /floors/:id/shape
  async getShapeByFloor(req, res, next) {
    try {
      const response = await floorService.getShapeByFloor(req.params.id);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new FloorController();
