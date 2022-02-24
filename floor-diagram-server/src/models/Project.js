const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, default: "New project", required: true },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const projectSchema = new Schema({
// 	title: { type: String, default: "New project" },
// 	groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
// });

// const Project = mongoose.model("Project", projectSchema);
// module.exports = Project;
