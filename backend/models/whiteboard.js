const mongoose = require("mongoose");

const ElementSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["line", "rectangle", "circle", "text"],
    required: true,
  },
  x: Number,
  y: Number,
  width: Number,
  height: Number,
  radius: Number,
  points: [Number],
  text: String,
  fontSize: Number,
  color: String,
  strokeWidth: Number,
});

const DrawingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  elements: [ElementSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Drawing = mongoose.model("Drawing", DrawingSchema);
module.exports = Drawing;
