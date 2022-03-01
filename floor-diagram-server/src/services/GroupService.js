const Room = require("../models/Room");
const Group = require("../models/Group");
const Team = require("../models/Team");
const Project = require("../models/Project");
const Employee = require("../models/Employee");
const Shape = require("../models/Shape");
const Floor = require("../models/Floor");
const Building = require("../models/Building");

class GroupService {
  // add
  async addGroup(groupInfo) {
    const newGroup = new Group(groupInfo);
    const savedGroup = await newGroup.save();

    if (groupInfo?.room) {
      const room = await Room.findById(groupInfo.room);
      room.groups = [savedGroup._id, ...room.groups];
      const updatedRoom = await room.save();

      const floor = await Floor.findById(updatedRoom?.floor);
      floor.groups = [savedGroup._id, ...floor.groups];
      const updatedFloor = await floor.save();

      const building = await Building.findById(updatedFloor?.building);
      building.groups = [savedGroup._id, ...building.groups];
      await building.save();
    }

    return savedGroup;
  }

  // get list
  async getListGroups() {
    const groups = await Group.find({})
      .populate("room teams projects employees")
      .select(["-__v", "-createdAt", "-updatedAt"]);

    return groups;
  }

  // get 1 group
  async getGroupById(_id) {
    const group = await Group.findById(_id)
      .populate("room teams projects employees")
      .select(["-__v", "-createdAt", "-updatedAt"]);
    if (!group) throw new Error("Group not found");

    return group;
  }

  // update
  async updateGroup(_id, groupInfo) {
    let updatedGroup = await Group.findOneAndUpdate({ _id }, groupInfo, {
      new: true,
    });

    return updatedGroup;
  }

  // delete
  async deleteGroup(_id) {
    const deletedGroup = await Group.findByIdAndDelete(_id);

    return deletedGroup;
  }

  // get team list in group
  async getListTeamByGroup(groupId) {
    const teams = await Group.findById(groupId)
      .select("teams")
      .populate("teams");

    return teams;
  }

  // get project list in group
  async getListProjectByGroup(groupId) {
    const projects = await Group.findById(groupId)
      .select("projects")
      .populate("projects");

    return projects;
  }

  // get employee list in group
  async getListEmployeeByGroup(groupId) {
    const employees = await Group.findById(groupId)
      .select("employees")
      .populate("employees");

    return employees;
  }
}

module.exports = new GroupService();
