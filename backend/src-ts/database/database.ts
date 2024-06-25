import { Sequelize, Op } from "sequelize";
import config from "config";
import mysql2 from "mysql2";
import { initModels } from "../models/initModels";

declare module "config" {
  interface IConfig {
    db: Sequelize;
  }
}

export const database = async function (): Promise<void> {
  config.db = new Sequelize("manaze", "sitaram", "mindfire", {
    operatorsAliases: {
      $like: Op.like,
      $and: Op.and,
      $or: Op.or,
      $gt: Op.gt,
      $gte: Op.gte,
      $lt: Op.lt,
      $lte: Op.lte,
      $ne: Op.ne,
      $in: Op.in,
    },
    dialectOptions: { dialectModule: mysql2 },
    port: 3306,
    host: "localhost",
    dialect: "mysql",
  });
  // require("./index")({ sequelize: db });
  initModels(config.db);
  try {
    await config.db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
