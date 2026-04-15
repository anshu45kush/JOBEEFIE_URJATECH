import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/urjatech")
  .then(() => console.log("✅ DB Connected"))
  .catch((err) => console.log(err));

// 🔥 ROUTES
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});