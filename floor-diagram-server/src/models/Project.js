const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, unique: true, required: true },
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
