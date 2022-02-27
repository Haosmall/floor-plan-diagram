const projectService = require("../services/ProjectService");

class ProjectController {
  // [POST] /api/projects
  async addProject(req, res, next) {
    try {
      const response = await projectService.addProject(req.body);

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/projects
  async getListProjects(req, res, next) {
    try {
      const response = await projectService.getListProjects();

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/projects/:id
  async getProjectById(req, res, next) {
    try {
      const response = await projectService.getProjectById(req.params.id);

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [PUT] /api/projects/:id
  async updateProject(req, res, next) {
    try {
      const response = await projectService.updateProject(
        req.params.id,
        req.body
      );
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [DELETE] /api/projects/:id
  async deleteProject(req, res, next) {
    try {
      const response = await projectService.deleteProject(req.params.id);

      res.status(204).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/projects/:id/team
  async getTeamByProject(req, res, next) {
    try {
      const response = await projectService.getTeamByProject(req.params.id);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  // [GET] /api/projects/:id/employees
  async getListEmployeeByProject(req, res, next) {
    try {
      const response = await projectService.getListEmployeeByProject(
        req.params.id
      );
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ProjectController();
