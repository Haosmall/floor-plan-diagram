const Group = require("../models/Group");
const Team = require("../models/Team");
const Project = require("../models/Project");
const Employee = require("../models/Employee");

class TeamService {
  // add
  async addTeam(teamInfo) {
    const team = await Team.findOne({ name: teamInfo.name });
    if (team) throw new Error("Team name already exist");

    // required field: name
    const newTeam = new Team(teamInfo);
    const savedTeam = await newTeam.save();

    return savedTeam;
  }

  // get list
  async getListTeams() {
    const group = await Team.find({}).populate("group project employees");

    return group;
  }

  // get 1 team
  async getTeamById(_id) {
    const team = await Team.findById(_id).populate("group project employees");
    if (!team) throw new Error("Team not found");

    return team;
  }

  // update
  async updateTeam(_id, teamInfo) {
    let updatedTeam = await Team.findOneAndUpdate({ _id }, teamInfo, {
      new: true,
    });

    return updatedTeam;
  }

  // delete
  async deleteTeam(_id) {
    const deletedTeam = await Team.findByIdAndDelete(_id);

    return deletedTeam;
  }

  // get project by team
  async getProjectByTeam(teamId) {
    const project = await Team.findById(teamId)
      .select("project")
      .populate("project");

    //if (!project.project) throw new Error("Team currently don't have project");

    return project;
  }

  // get employee list in team
  async getListEmployeeByTeam(teamId) {
    const employees = await Team.findById(teamId)
      .select("employees")
      .populate("employees");

    return employees;
  }
}

module.exports = new TeamService();
