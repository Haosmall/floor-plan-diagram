const Room = require("../models/Room");
const Floor = require("../models/Floor");
const Group = require("../models/Group");
const Team = require("../models/Team");
const Project = require("../models/Project");
const Employee = require("../models/Employee");
const Shape = require("../models/Shape");

class RoomService {
  // add
  async addRoom(roomInfo) {
    const room = await Room.findOne({ name: roomInfo.name });
    if (room) throw new Error("Room name already exist");

    // required field: name
    const newRoom = new Room(roomInfo);
    const savedRoom = await newRoom.save();

    return savedRoom;
  }

  // get list
  async getListRooms() {
    const rooms = await Room.find({})
      .populate("floor groups teams projects employees shapes")
      .select(["-__v", "-createdAt", "-updatedAt"]);

    return rooms;
  }

  // get 1 room
  async getRoomById(_id) {
    const room = await Room.findById(_id)
      .populate("floor groups teams projects employees shapes")
      .select(["-__v", "-createdAt", "-updatedAt"]);
    if (!room) throw new Error("Room not found");

    return room;
  }

  // update
  async updateRoom(_id, roomInfo) {
    let updatedRoom = await Room.findOneAndUpdate({ _id }, roomInfo, {
      new: true,
    });

    return updatedRoom;
  }

  // delete
  async deleteRoom(_id) {
    const deletedRoom = await Room.findByIdAndDelete(_id);

    return deletedRoom;
  }

  // get group list in room
  async getListGroupByRoom(roomId) {
    const groups = await Room.findById(roomId)
      .select("groups")
      .populate("groups");

    return groups;
  }

  // get team list in room
  async getListTeamByRoom(roomId) {
    const teams = await Room.findById(roomId).select("teams").populate("teams");

    return teams;
  }

  // get project list in room
  async getListProjectByRoom(roomId) {
    const projects = await Room.findById(roomId)
      .select("projects")
      .populate("projects");

    return projects;
  }

  // get employee list in room
  async getListEmployeeByRoom(roomId) {
    const employees = await Room.findById(roomId)
      .select("employees")
      .populate("employees");

    return employees;
  }

  // get shape list in room
  async getListShapeByRoom(roomId) {
    const shapes = await Room.findById(roomId)
      .select("shapes")
      .populate("shapes");

    return shapes;
  }
}

module.exports = new RoomService();
