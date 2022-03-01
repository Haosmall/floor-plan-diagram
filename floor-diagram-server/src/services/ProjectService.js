const Group = require("../models/Group");
const Room = require("../models/Room");
const Team = require("../models/Team");
const Project = require("../models/Project");
const Employee = require("../models/Employee");

class ProjectService {
  // add
  async addProject(projectInfo) {
    const project = await Project.findOne({ name: projectInfo.name });
    if (project) throw new Error("Project name already exist");

    // required field: name
    const newProject = new Project(projectInfo);
    const savedProject = await newProject.save();

    return savedProject;
  }

  // get list
  async getListProjects() {
    const group = await Project.find({})
      .populate("team employees")
      .select(["-__v", "-createdAt", "-updatedAt"]);

    return group;
  }

  // get 1 project
  async getProjectById(_id) {
    const project = await Project.findById(_id)
      .populate("team employees")
      .select(["-__v", "-createdAt", "-updatedAt"]);
    if (!project) throw new Error("Project not found");

    return project;
  }

  // update
  async updateProject(_id, projectInfo) {
    let updatedProject = await Project.findOneAndUpdate({ _id }, projectInfo, {
      new: true,
    });

    return updatedProject;
  }

  // delete
  async deleteProject(_id) {
    const deletedProject = await Project.findByIdAndDelete(_id);

    return deletedProject;
  }

  // get team by project
  async getTeamByProject(projectId) {
    const team = await Project.findById(projectId)
      .select("team")
      .populate("team");

    return team;
  }

  // get employee list in project
  async getListEmployeeByProject(projectId) {
    const employees = await Project.findById(projectId)
      .select("employees")
      .populate("employees");

    return employees;
  }
}

module.exports = new ProjectService();
