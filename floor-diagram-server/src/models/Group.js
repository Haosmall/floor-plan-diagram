const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
	title: { type: String, default: "New group" },
	buildingId: { type: mongoose.Schema.Types.ObjectId, ref: "Building" },
});

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
