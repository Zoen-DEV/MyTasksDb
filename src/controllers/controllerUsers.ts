require("dotenv").config();
import db from "../models";
const { Users } = db;
const bcrypt = require("bcrypt");
const saltRounds = 10;
// const myPlaintextPassword = "s0//P4$$w0rD";

export const normalSignup = async (obj: any) => {
  const { email, password, userName } = obj;
  const user = await Users.findOne({ where: { email } });
  try {
    if (!user) {
      const hashedPassword = bcrypt.hashSync(password, saltRounds);
      // console.log(bcrypt.compareSync(password, hashedPassword))
      const newUser = await Users.create({
        email,
        userName,
        password: hashedPassword,
      });
      return newUser;
    } else {
      return "Ya existe un usuario con este correo";
    }
  } catch (error) {
    console.error(error);
  }
};

export const normalLogin = async (obj: any) => {
  const { email, password } = obj;
  const user = await Users.findOne({ where: { email } });
  try {
    if (!user) {
      return "email incorrecto";
    } else if (!bcrypt.compareSync(password, user.password)) {
      return "password incorrecto";
    } else {
      return {
        userName: user.userName,
        email: user.email,
      };
    }
  } catch (err) {
    console.error(err);
  }
};
