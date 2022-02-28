const groupService = require("../services/GroupService");

class GroupController {
  // [POST] /api/groups
  async addGroup(req, res, next) {
    try {
      const response = await groupService.addGroup(req.body);

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/groups
  async getListGroups(req, res, next) {
    try {
      const response = await groupService.getListGroups();

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/groups/:id
  async getGroupById(req, res, next) {
    try {
      const response = await groupService.getGroupById(req.params.id);

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [PUT] /api/groups/:id
  async updateGroup(req, res, next) {
    try {
      const response = await groupService.updateGroup(req.params.id, req.body);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [DELETE] /api/groups/:id
  async deleteGroup(req, res, next) {
    try {
      const response = await groupService.deleteGroup(req.params.id);

      res.status(204).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/groups/:id/teams
  async getListTeamByGroup(req, res, next) {
    try {
      const response = await groupService.getListTeamByGroup(req.params.id);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/groups/:id/projects
  async getListProjectByGroup(req, res, next) {
    try {
      const response = await groupService.getListProjectByGroup(req.params.id);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/groups/:id/employees
  async getListEmployeeByGroup(req, res, next) {
    try {
      const response = await groupService.getListEmployeeByGroup(req.params.id);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new GroupController();
