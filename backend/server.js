const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const whiteboardRoutes = require("./routes/whiteboardRoutes");

const PORT = process.env.PORT || 5000;
// connect the database
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// routes
app.use("/api/whiteboard", whiteboardRoutes);

app.get("/", (req, res) => {
  res.send(`Server is running on port ${PORT} successfully.`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
