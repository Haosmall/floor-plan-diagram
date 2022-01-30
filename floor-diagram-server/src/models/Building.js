const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const buildingSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			default: "New building",
		},
		admin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

const Building = mongoose.model("Building", buildingSchema);
module.exports = Building;
