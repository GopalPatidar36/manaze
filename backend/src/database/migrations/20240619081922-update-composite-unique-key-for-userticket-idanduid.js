"use strict";

module.exports = {
  up: function ({ context }) {
    const { queryInterface } = context;

    return queryInterface.sequelize.query(`
      ALTER TABLE user_ticket ADD CONSTRAINT unique_ticket_assignee UNIQUE (ticket, assignee);
      `);
  },
  down: function ({ context }) {
    const { queryInterface } = context;
    return queryInterface.sequelize.query(`
      ALTER TABLE user_ticket DROP INDEX unique_ticket_assignee;
      `);
  },
};
