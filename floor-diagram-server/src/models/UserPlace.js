const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userFloorSchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		floorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Floor",
			required: true,
		},
		buildingId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Building",
			required: true,
		},
	},
	{ timestamps: true }
);

const UserPlace = mongoose.model("UserPlace", userFloorSchema);
module.exports = UserPlace;
