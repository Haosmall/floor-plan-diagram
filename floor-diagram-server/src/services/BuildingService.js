const Building = require("../models/Building");

class BuildingService {
  // add
  async addBuilding(buildingInfo) {
    const building = await Building.findOne({ name: buildingInfo.name });
    if (building) throw new Error("Building name already exist");

    // required field: name
    const newBuilding = new Building(buildingInfo);
    const savedBuilding = await newBuilding.save();

    return savedBuilding;
  }

  // get list
  async getListBuildings() {
    const buildings = await Building.find({}).populate(
      "floors rooms groups teams projects employees"
    );

    return buildings;
  }

  // get building by Id
  async getBuildingById(_id) {
    const building = await Building.findById(_id).populate(
      "floors rooms groups teams projects employees"
    );
    if (!building) throw new Error("Building not found");

    return building;
  }

  // update
  async updateBuilding(_id, buildingInfo) {
    let updatedBuilding = await Building.findOneAndUpdate(
      { _id },
      buildingInfo,
      {
        new: true,
      }
    );

    return updatedBuilding;
  }

  // delete
  async deleteBuilding(_id) {
    const deletedBuilding = await Building.findByIdAndDelete(_id);

    return deletedBuilding;
  }

  // get floor list in building
  async getFloorsByBuildingId(buildingId) {
    const floors = await Building.findById(buildingId)
      .select("floors")
      .populate("floors");

    return floors;
  }

  // get room list in building
  async getListRoomByBuildingId(buildingId) {
    const rooms = await Building.findById(buildingId)
      .select("rooms")
      .populate("rooms");

    return rooms;
  }

  // get group list in building
  async getListGroupByBuilding(buildingId) {
    const groups = await Building.findById(buildingId)
      .select("groups")
      .populate("groups");

    return groups;
  }

  // get team list in building
  async getListTeamByBuilding(buildingId) {
    const teams = await Building.findById(buildingId)
      .select("teams")
      .populate("teams");

    return teams;
  }

  // get project list in building
  async getListProjectByBuilding(buildingId) {
    const projects = await Building.findById(buildingId)
      .select("projects")
      .populate("projects");

    return projects;
  }

  // get employee list in building
  async getListEmployeeByBuilding(buildingId) {
    const employees = await Building.findById(buildingId)
      .select("employees")
      .populate("employees");

    return employees;
  }
}

module.exports = new BuildingService();
