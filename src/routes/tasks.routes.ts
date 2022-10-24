import { Router } from "express";
import { getTasks, postTask } from "../controllers/controllerTasks";
// import db from "../models";
import db from "../models";
const { Tasks, Users } = db;

const server = Router();

server.post("/", async (req, res) => {
  try {
    const response = await postTask(req.body);
    res.send(response);
  } catch (err) {
    console.error(err);
  }
});

server.get("/", async (req, res) => {
  try {
    const response = await getTasks(req.body);
    res.send(response);
  } catch (err) {
    console.error(err);
  }
});

server.put("/", async (req, res) => {
  const { taskId } = req.body;
  try {
    const task = await Tasks.findOne({ where: { id: taskId } });
    if (task.state) {
      task.state = false;
    } else {
      task.state = true;
    }
    await task.save();
    return task;
  } catch (err) {
    console.error(err);
  }
});

export default server;
