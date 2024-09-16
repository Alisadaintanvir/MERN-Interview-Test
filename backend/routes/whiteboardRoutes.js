const express = require("express");
const whiteboardController = require("../controllers/whiteboardController");

const router = express.Router();

router.get("/", whiteboardController.getDrawing);
router.get("/:id", whiteboardController.getDrawingById);
router.post("/add", whiteboardController.addDrawing);
router.patch("/:id", whiteboardController.updateDrawing);
router.delete("/:id", whiteboardController.deleteDrawing);

module.exports = router;
