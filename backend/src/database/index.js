const { Umzug, SequelizeStorage } = require("umzug");

const MIGRATION_TYPE = {
  UP: "up",
  DOWN: "down",
};

async function migrations({ sequelize, type = MIGRATION_TYPE.UP }) {
  console.log("APPLY_DB_MIGRATIONS Execution Start", type);
  try {
    const umzug = new Umzug({
      migrations: { glob: `${__dirname}/migrations/*.js` },
      context: {
        queryInterface: sequelize.getQueryInterface(),
        Sequelize: sequelize.constructor,
      },
      storage: new SequelizeStorage({
        sequelize,
        tableName: "migrations_history",
      }),
      logger: console,
    });
    if (type === MIGRATION_TYPE.UP) {
      const result = await umzug.up();
      console.log("Migrations up went successful!", result);
    } else if (type === MIGRATION_TYPE.DOWN) {
      const result = await umzug.down();
      console.log("Migrations down went successful!", result);
    }
  } catch (e) {
    console.error("Error: ", e);
  }
}

module.exports = migrations;
