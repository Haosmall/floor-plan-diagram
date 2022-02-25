const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const floorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    building: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Building",
      required: true,
    },
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
    shape: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shape",
    },
  },
  { timestamps: true }
);

const Floor = mongoose.model("Floor", floorSchema);

module.exports = Floor;

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const floorSchema = new Schema(
// 	{
// 		name: {
// 			type: String,
// 			required: true,
// 			default: "New floor",
// 		},
// 		buildingId: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: "Building",
// 			required: true,
// 		},
// 		admin: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: "User",
// 			required: true,
// 		},
// 	},
// 	{ timestamps: true }
// );

// const Floor = mongoose.model("Floor", floorSchema);
// module.exports = Floor;
