import { Router } from "express";
const server = Router();
import db from "../models";
const { Users, SignupToken } = db;

server.put("/", async (req, res) => {
  const { token, email } = req.body;
  const dbToken = await SignupToken.findOne({ where: { UserTokenId: email } });
  const user = await Users.findOne({ where: { email } });
  try {
    if (dbToken.token === token) {
      user.isActive = true;
      await user.save();
      await SignupToken.destroy({where: {id: dbToken.id}})
      res.send('Usuario autentificado con exito')
    }
  } catch (err) {
    console.error(err);
  }
});

export default server;
