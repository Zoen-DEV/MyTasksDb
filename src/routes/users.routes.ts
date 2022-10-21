import { Router } from "express";
import { normalLogin, normalSignup } from "../controllers/controllerUsers";
// import db from "../models";

const server = Router();

server.post("/", async (req, res) => {
  try {
    const response = await normalSignup(req.body);
    res.send(response);
  } catch (err) {
    console.error(err);
  }
});

server.get("/", async (req, res) => {
  try {
    const response = await normalLogin(req.body);
    res.send(response);
  } catch (err) {
    console.error(err);
  }
});

export default server;
