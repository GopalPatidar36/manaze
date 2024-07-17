import { jest } from "@jest/globals";

jest.mock("config", () => {
  const { Sequelize, Op } = require("sequelize");
  const db = new Sequelize({
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
    port: 3306,
    host: "localhost",
    dialect: "mysql",
  });
  const { initModels } = require("../models/initModels");
  initModels(db);
  return {
    db,
  };
});
