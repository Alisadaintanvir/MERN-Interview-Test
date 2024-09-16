const Drawing = require("../models/whiteboard");

const drawingControllers = {
  addDrawing: async (req, res) => {
    const { name, elements } = req.body;
    try {
      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }
      //check if the drawing with same name already exists
      const existingDrawing = await Drawing.findOne({ name });
      if (existingDrawing) {
        return res.status(409).json({
          message:
            "Drawing with same name already exists.Please choose a different name",
        });
      }
      const newDrawing = new Drawing({
        name,
        elements,
      });
      await newDrawing.save();
      res.status(201).json(newDrawing);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getDrawing: async (req, res) => {
    try {
      const drawings = await Drawing.find();
      res.status(200).json(drawings);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

module.exports = drawingControllers;
