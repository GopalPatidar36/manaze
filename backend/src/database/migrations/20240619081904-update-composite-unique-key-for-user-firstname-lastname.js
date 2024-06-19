"use strict";

module.exports = {
  up: function ({ context }) {
    const { queryInterface } = context;

    return queryInterface.sequelize.query(`
      ALTER TABLE users ADD CONSTRAINT unique_firstname_lastnaame UNIQUE (first_name, last_name);
      `);
  },
  down: function ({ context }) {
    const { queryInterface } = context;
    return queryInterface.sequelize.query(`
      ALTER TABLE users DROP INDEX unique_firstname_lastnaame;
      `);
  },
};
