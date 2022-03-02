const Group = require("../models/Group");
const Room = require("../models/Room");
const Team = require("../models/Team");
const Project = require("../models/Project");
const Employee = require("../models/Employee");
const Floor = require("../models/Floor");
const Building = require("../models/Building");

class ProjectService {
  // add
  async addProject(projectInfo) {
    const newProject = new Project(projectInfo);
    const savedProject = await newProject.save();

    if (projectInfo?.team) {
      const team = await Team.findById(projectInfo.team);
      team.project = savedProject._id;
      const updatedTeam = await team.save();

      const group = await Group.findById(updatedTeam?.group);
      group.projects = [savedProject._id, ...group.projects];
      const updatedGroup = await group.save();

      const room = await Room.findById(updatedGroup?.room);
      room.projects = [savedProject._id, ...room.projects];
      const updatedRoom = await room.save();

      const floor = await Floor.findById(updatedRoom?.floor);
      floor.projects = [savedProject._id, ...floor.projects];
      const updatedFloor = await floor.save();

      const building = await Building.findById(updatedFloor?.building);
      building.projects = [savedProject._id, ...building.projects];
      await building.save();
    }

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

    // building > floor > room > group > team > project
    if (deletedProject && deletedProject?.team) {
      const team = await Team.findById(deletedProject.team.toString());
      team.project = null;
      const updatedTeam = await team.save();

      if (updatedTeam?.group) {
        const group = await Group.findById(updatedTeam.group.toString());
        group.projects = group?.projects.length
          ? group?.projects.filter(
              (pId) => pId.toString() !== deletedProject._id.toString()
            )
          : [];
        const updatedGroup = await group.save();

        if (updatedGroup?.room) {
          const room = await Room.findById(updatedGroup.room.toString());
          room.projects = room?.projects.length
            ? room?.projects.filter(
                (pId) => pId.toString() !== deletedProject._id.toString()
              )
            : [];
          const updatedRoom = await room.save();

          if (updatedRoom?.floor) {
            const floor = await Floor.findById(updatedRoom.floor.toString());
            floor.projects = floor?.projects.length
              ? floor?.projects.filter(
                  (pId) => pId.toString() !== deletedProject._id.toString()
                )
              : [];
            const updatedFloor = await floor.save();

            if (updatedFloor?.building) {
              const building = await Building.findById(
                updatedFloor.building.toString()
              );
              building.projects = building?.projects.length
                ? building?.projects.filter(
                    (pId) => pId.toString() !== deletedProject._id.toString()
                  )
                : [];
              await building.save();
            }
          }
        }
      }
    }

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
