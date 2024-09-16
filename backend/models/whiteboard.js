const mongoose = require("mongoose");

// Define a schema for the elements in the drawing
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

// Define a schema for the drawing
const DrawingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    elements: [ElementSchema],
  },
  { timestamps: true }
);

const Drawing = mongoose.model("Drawing", DrawingSchema);
module.exports = Drawing;

// sample data for at least two drawings
const sampleData = [
  {
    _id: {
      $oid: "66e85f01133442836c870f56",
    },
    name: "Simple Shapes",
    elements: [
      {
        type: "rectangle",
        x: 552,
        y: 342,
        width: 278,
        height: 145,
        radius: 0,
        points: [],
        _id: {
          $oid: "66e85f01133442836c870f57",
        },
      },
      {
        type: "circle",
        x: 1156,
        y: 191,
        width: 0,
        height: 0,
        radius: 172.19175357722565,
        points: [],
        _id: {
          $oid: "66e85f01133442836c870f58",
        },
      },
    ],
    createdAt: {
      $date: "2024-09-16T16:38:25.680Z",
    },
    updatedAt: {
      $date: "2024-09-16T16:38:25.680Z",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "66e85f02133442836c870f59",
    },
    name: "Text and Line",
    elements: [
      {
        type: "text",
        x: 300,
        y: 200,
        width: 0,
        height: 0,
        radius: 0,
        points: [],
        text: "Hello, Whiteboard!",
        fontSize: 24,
        color: "#000000",
        _id: {
          $oid: "66e85f02133442836c870f5a",
        },
      },
      {
        type: "line",
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        radius: 0,
        points: [300, 250, 500, 400],
        color: "#000000",
        strokeWidth: 2,
        _id: {
          $oid: "66e85f02133442836c870f5b",
        },
      },
    ],
    createdAt: {
      $date: "2024-09-16T16:38:26.123Z",
    },
    updatedAt: {
      $date: "2024-09-16T16:38:26.123Z",
    },
    __v: 0,
  },
];
