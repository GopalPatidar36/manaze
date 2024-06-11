"use strict";

module.exports = {
  up: function ({ context }) {
    const { queryInterface, Sequelize } = context;

    return queryInterface.createTable("user_ticket", {
      id: {
        autoIncrement: true,
        type: Sequelize.DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      created_by: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "uid",
        },
      },
      assignee: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "uid",
        },
      },
      ticket: {
        type: Sequelize.DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: "tickets",
          key: "id",
        },
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("NOW()"),
      },
      estimate_time: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("NOW()"),
      },
      deleted_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
    });
  },
  down: function ({ context }) {
    const { queryInterface } = context;
    return queryInterface.dropTable("user_ticket");
  },
};
