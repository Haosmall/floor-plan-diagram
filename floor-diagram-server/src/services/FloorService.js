const Floor = require("../models/Floor");
const Room = require("../models/Room");
const Group = require("../models/Group");
const Team = require("../models/Team");
const Project = require("../models/Project");
const Employee = require("../models/Employee");

class FloorService {
  // add
  async addFloor(floorInfo) {
    const floor = await Floor.findOne({ name: floorInfo.name });
    if (floor) throw new Error("Floor name already exist");

    // required field: name
    const newFloor = new Floor(floorInfo);
    const savedFloor = await newFloor.save();

    return savedFloor;
  }

  // get list
  async getListFloors() {
    const floors = await Floor.find({}).populate(
      "rooms groups teams projects employees"
    );

    return floors;
  }

  // get 1 floor
  async getFloorById(_id) {
    const floor = await Floor.findById(_id).populate(
      "rooms groups teams projects employees"
    );
    if (!floor) throw new Error("Floor not found");

    return floor;
  }

  // update
  async updateFloor(_id, floorInfo) {
    const floor = await Floor.findById(_id);
    if (!floor) throw new Error("Floor not found");

    floor.name = floorInfo.name;
    floor.building = floorInfo.building;
    floor.rooms = floorInfo.rooms?.length ? [...floorInfo.rooms] : [];
    floor.groups = floorInfo?.groups?.length ? [...floorInfo.groups] : [];
    floor.teams = floorInfo?.teams?.length ? [...floorInfo.teams] : [];
    floor.projects = floorInfo?.projects?.length ? [...floorInfo.projects] : [];
    floor.employees = floorInfo?.employees?.length
      ? [...floorInfo.employees]
      : [];

    const updatedFloor = await floor.save();

    return updatedFloor;
  }

  // delete
  async deleteFloor(_id) {
    const deletedFloor = await Floor.findByIdAndDelete(_id);

    return deletedFloor;
  }

  // get room list in floor
  async getListRoomByFloorId(floorId) {
    const rooms = await Floor.findById(floorId)
      .select("rooms")
      .populate("rooms");

    return rooms;
  }

  // get group list in floor
  async getListGroupByFloor(floorId) {
    const groups = await Floor.findById(floorId)
      .select("groups")
      .populate("groups");

    return groups;
  }

  // get team list in floor
  async getListTeamByFloor(floorId) {
    const teams = await Floor.findById(floorId)
      .select("teams")
      .populate("teams");

    return teams;
  }

  // get project list in floor
  async getListProjectByFloor(floorId) {
    const projects = await Floor.findById(floorId)
      .select("projects")
      .populate("projects");

    return projects;
  }

  // get employee list in floor
  async getListEmployeeByFloor(floorId) {
    const employees = await Floor.findById(floorId)
      .select("employees")
      .populate("employees");

    return employees;
  }
}

module.exports = new FloorService();
