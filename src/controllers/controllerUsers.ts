require("dotenv").config();
import { transporter } from "../../config/mail";
import db from "../models";
const { Users, SignupToken } = db;
const bcrypt = require("bcrypt");
const saltRounds = 10;
// const myPlaintextPassword = "s0//P4$$w0rD";

export const normalSignup = async (obj: any) => {
  const { email, password, userName } = obj;
  const user = await Users.findOne({ where: { email } });
  try {
    if (!user) {
      const passwordHash = bcrypt.hashSync(password, saltRounds);
      const emailHash = bcrypt.hashSync(email, saltRounds);
      const token = `${emailHash}-${passwordHash}`;

      await transporter.sendMail({
        from: '"My Tasks 📝" <mytasksmobileapp@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Activacion de cuenta en My Tasks App", // Subject line
        html: ` <div styles={{ display: "flex", flexDirection: "column", alignItems: "center", background: "#232323" }}>
                    <h2 styles={{ color: "blue"}}>Hola ${userName}, bienvenidx a My Tasks</h2>
                    <p>Estas solo a un paso de poder guardar todas tus tareas y verificarlas estes donde estes. Solo haz click en el link de abajo y listo! esperamos que nuestra humilde app te sea de utilidad!</p>
                    <a href='http://localhost:3002/${token}'>ACTIVAR CUENTA3</a>
                </div>`, // html body
      });

      const newUser = await Users.create({
        email,
        userName,
        password: passwordHash,
      });
      await SignupToken.create({
        token,
        UserTokenId: email,
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
