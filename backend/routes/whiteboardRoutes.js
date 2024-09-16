const express = require("express");
const whiteboardController = require("../controllers/whiteboardController");

const router = express.Router();

router.get("/", whiteboardController.getDrawing);
router.post("/add", whiteboardController.addDrawing);
module.exports = router;
