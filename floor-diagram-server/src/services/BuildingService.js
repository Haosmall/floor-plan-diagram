const Building = require("../models/Building");
const Admin = require("../models/Admin");
const Room = require("../models/Room");
const Group = require("../models/Group");
const Team = require("../models/Team");
const Project = require("../models/Project");
const Employee = require("../models/Employee");
const Shape = require("../models/Shape");
const Floor = require("../models/Floor");

class BuildingService {
  // add
  async addBuilding(buildingInfo) {
    const building = await Building.findOne({ name: buildingInfo.name });
    if (building) throw new Error("Building name already exist");

    if (buildingInfo?.admin) {
      const employee = await Employee.findById(buildingInfo?.admin.toString());
      if (employee.isBuildingAdmin)
        throw new Error("Employee already an admin on other building");
      employee.isBuildingAdmin = true;
      await employee.save();
    }
    const newBuilding = new Building(buildingInfo);
    const savedBuilding = await newBuilding.save();

    return savedBuilding;
  }

  // get list
  async getListBuildings() {
    const buildings = await Building.find({})
      .populate("admin floors rooms groups teams projects employees")
      .select(["-__v", "-createdAt", "-updatedAt"]);

    return buildings;
  }

  // get building by Id
  async getBuildingById(_id) {
    const building = await Building.findById(_id)
      .populate("admin floors rooms groups teams projects employees")
      .select(["-__v", "-createdAt", "-updatedAt"]);
    if (!building) throw new Error("Building not found");

    return building;
  }

  // update
  async updateBuilding(_id, buildingInfo) {
    if (buildingInfo?.admin) {
      const building = await Building.findById(_id);
      if (building.admin.toString() !== buildingInfo.admin.toString()) {
        const newBuildingAd = await Employee.findById(
          buildingInfo.admin.toString()
        );
        // if new building admin already an admin
        if (newBuildingAd.isBuildingAdmin)
          throw new Error("Employee already an admin on other building");
        // promote new employee in place of old building admin
        // old building admin
        const oldBuildingAd = await Employee.findById(
          building.admin.toString()
        );
        oldBuildingAd.isBuildingAdmin = false;
        await oldBuildingAd.save();
        // new building admin
        newBuildingAd.isBuildingAdmin = true;
        await newBuildingAd.save();
      }
    }

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
    const building = await Building.findById(_id);
    if (building?.admin) {
      const employee = await Employee.findById(building.admin.toString());
      employee.isBuildingAdmin = false;
      await employee.save();
    }

    const deletedBuilding = await Building.findByIdAndDelete(_id);

    // building > floor > room > group > team > project
    if (deletedBuilding && deletedBuilding?.floors.length) {
      for (let fId of deletedBuilding.floors) {
        const floor = await Floor.findById(fId.toString());
        floor.building = null;
        await floor.save();
      }
    }

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
