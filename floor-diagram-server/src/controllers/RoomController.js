const roomService = require("../services/RoomService");

class RoomController {
  // [POST] /api/rooms
  async addRoom(req, res, next) {
    try {
      const response = await roomService.addRoom(req.body);

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/rooms
  async getListRooms(req, res, next) {
    try {
      const response = await roomService.getListRooms();

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/rooms/:id
  async getRoomById(req, res, next) {
    try {
      const response = await roomService.getRoomById(req.params.id);

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [PUT] /api/rooms/:id
  async updateRoom(req, res, next) {
    try {
      const response = await roomService.updateRoom(req.params.id, req.body);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [DELETE] /api/rooms/:id
  async deleteRoom(req, res, next) {
    try {
      const response = await roomService.deleteRoom(req.params.id);

      res.status(204).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/rooms/:id/groups
  async getListGroupByRoom(req, res, next) {
    try {
      const response = await roomService.getListGroupByRoom(req.params.id);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/rooms/:id/teams
  async getListTeamByRoom(req, res, next) {
    try {
      const response = await roomService.getListTeamByRoom(req.params.id);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/rooms/:id/projects
  async getListProjectByRoom(req, res, next) {
    try {
      const response = await roomService.getListProjectByRoom(req.params.id);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/rooms/:id/employees
  async getListEmployeeByRoom(req, res, next) {
    try {
      const response = await roomService.getListEmployeeByRoom(req.params.id);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/rooms/:id/shapes
  async getListShapeByRoom(req, res, next) {
    try {
      const response = await roomService.getListShapeByRoom(req.params.id);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new RoomController();
