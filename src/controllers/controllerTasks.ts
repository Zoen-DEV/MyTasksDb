require("dotenv").config();
import db from "../models";
const { Tasks, Users } = db;

export const postTask = async (obj: any) => {
  const { title, description, UserId } = obj;
  const user = await Users.findOne({ where: { email: UserId } });
  try {
    if (!user) {
      return false;
    } else {
      const newTask = await Tasks.create({
        title,
        description,
        UserId,
      });
      return newTask;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getTasks = async (obj: any) => {
  const { UserId } = obj;
  const user = await Users.findOne({ where: { email: UserId } });
  try {
    if (!user) {
      return false;
    } else {
      const allTasks = await Tasks.findAll({ where: { UserId } });
      return allTasks;
    }
  } catch (err) {
    console.error(err);
  }
};
