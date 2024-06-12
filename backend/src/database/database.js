const { Sequelize } = require("sequelize");
const config = require('config');

const database = async function () {
  config.db = new Sequelize("manaze", "sitaram", "mindfire", {
    port: 3306,
    host: "localhost",
    dialect: "mysql",
  });

  require("./index")({ sequelize: config.db });
  require('../models/init-models')(config.db);
  try {
    await config.db.authenticate(config.db);
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = database;
