const teamService = require("../services/TeamService");

class TeamController {
  // [POST] /api/teams
  async addTeam(req, res, next) {
    try {
      const response = await teamService.addTeam(req.body);

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/teams
  async getListTeams(req, res, next) {
    try {
      const response = await teamService.getListTeams();

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/teams/:id
  async getTeamById(req, res, next) {
    try {
      const response = await teamService.getTeamById(req.params.id);

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [PUT] /api/teams/:id
  async updateTeam(req, res, next) {
    try {
      const response = await teamService.updateTeam(req.params.id, req.body);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [DELETE] /api/teams/:id
  async deleteTeam(req, res, next) {
    try {
      const response = await teamService.deleteTeam(req.params.id);

      res.status(204).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/teams/:id/project
  async getProjectByTeam(req, res, next) {
    try {
      const response = await teamService.getProjectByTeam(req.params.id);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/teams/:id/employees
  async getListEmployeeByTeam(req, res, next) {
    try {
      const response = await teamService.getListEmployeeByTeam(req.params.id);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new TeamController();
