const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const buildingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    floors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Floor",
      },
    ],
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
  },
  { timestamps: true }
);

const Building = mongoose.model("Building", buildingSchema);

module.exports = Building;

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const buildingSchema = new Schema(
// 	{
// 		name: {
// 			type: String,
// 			required: true,
// 			default: "New building",
// 		},
// 		admin: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: "User",
// 			required: true,
// 		},
// 	},
// 	{ timestamps: true }
// );

// const Building = mongoose.model("Building", buildingSchema);
// module.exports = Building;
