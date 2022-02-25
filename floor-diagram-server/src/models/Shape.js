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
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    items: [{ type: String }],
  },
  { timestamps: true }
);

const Shape = mongoose.model("Shape", shapeSchema);

module.exports = Shape;
