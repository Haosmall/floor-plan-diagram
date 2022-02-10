const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shapeSchema = new Schema(
	{
		type: { type: String, required: true, default: "rect" },
		width: { type: Number, required: true, default: 150 },
		height: { type: Number, required: true, default: 100 },
		fill: { type: String },
		rotation: { type: Number, default: 0 },
		x: { type: Number, required: true, default: 100 },
		y: { type: Number, required: true, default: 200 },
		radius: { type: Number, default: 50 },
		src: { type: String },
		staff: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		items: [{ type: String }],
		floorId: { type: mongoose.Schema.Types.ObjectId, ref: "Floor" },
		projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
	},
	{ timestamps: true }
);

const Shape = mongoose.model("Shape", shapeSchema);
module.exports = Shape;
