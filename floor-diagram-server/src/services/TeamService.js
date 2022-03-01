const Group = require("../models/Group");
const Team = require("../models/Team");
const Project = require("../models/Project");
const Employee = require("../models/Employee");
const Room = require("../models/Room");
const Floor = require("../models/Floor");
const Building = require("../models/Building");

class TeamService {
  // add
  async addTeam(teamInfo) {
    const newTeam = new Team(teamInfo);
    const savedTeam = await newTeam.save();

    if (teamInfo?.group) {
      const group = await Group.findById(teamInfo.group);
      group.teams = [savedTeam._id, ...group.teams];
      const updatedGroup = await group.save();

      const room = await Room.findById(updatedGroup?.room);
      room.teams = [savedTeam._id, ...room.teams];
      const updatedRoom = await room.save();

      const floor = await Floor.findById(updatedRoom?.floor);
      floor.teams = [savedTeam._id, ...floor.teams];
      const updatedFloor = await floor.save();

      const building = await Building.findById(updatedFloor?.building);
      building.teams = [savedTeam._id, ...building.teams];
      await building.save();
    }

    return savedTeam;
  }

  // get list
  async getListTeams() {
    const group = await Team.find({})
      .populate("group project employees")
      .select(["-__v", "-createdAt", "-updatedAt"]);

    return group;
  }

  // get 1 team
  async getTeamById(_id) {
    const team = await Team.findById(_id)
      .populate("group project employees")
      .select(["-__v", "-createdAt", "-updatedAt"]);
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

    // building > floor > room > group > team > project
    if (deletedTeam) {
      if (deletedTeam?.group) {
        const group = await Group.findById(deletedTeam.group.toString());
        group.teams = group?.teams.length
          ? group?.teams.filter(
              (tId) => tId.toString() !== deletedTeam._id.toString()
            )
          : [];
        await group.save();
      }

      if (deletedTeam?.project) {
        const project = await Project.findById(deletedTeam.project.toString());
        project.team = null;
        await project.save();
      }
    }

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
