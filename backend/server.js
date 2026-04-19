const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Task = require("./models/Task");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect MongoDB
require("dotenv").config(); // if you added dotenv

mongoose.connect("mongodb://sarondip:sarondip123@ac-yni8pn8-shard-00-00.p6nbt4k.mongodb.net:27017,ac-yni8pn8-shard-00-01.p6nbt4k.mongodb.net:27017,ac-yni8pn8-shard-00-02.p6nbt4k.mongodb.net:27017/todoDB?ssl=true&replicaSet=atlas-lbq1bq-shard-0&authSource=admin&retryWrites=true&w=majority")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ✅ GET — get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ POST — add new task
app.post("/tasks", async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.json({ message: "Task saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ DELETE — delete task by ID
app.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ PUT — update task by ID
app.put("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Task updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});