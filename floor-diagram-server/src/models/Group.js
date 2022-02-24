const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: { type: String, default: "New group", required: true },
  floor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Floor",
    required: true,
  },
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
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const groupSchema = new Schema({
// 	title: { type: String, default: "New group" },
// 	buildingId: { type: mongoose.Schema.Types.ObjectId, ref: "Building" },
// });

// const Group = mongoose.model("Group", groupSchema);
// module.exports = Group;
