const { Sequelize } = require("sequelize");

const database = async function () {
  const sequelize = new Sequelize("", "", "", {
    port: 3306,
    host: "localhost",
    dialect: "mysql",
  });

  require("./index")({ sequelize });
  require('../models/init-models')(sequelize);
  try {
    await sequelize.authenticate(sequelize);
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = database;
