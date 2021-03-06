const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  name: { type: String, required: true, unique: true },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
