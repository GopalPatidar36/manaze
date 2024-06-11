"use strict";

module.exports = {
  up: function ({ context }) {
    const { queryInterface, Sequelize } = context;

    return queryInterface.createTable("tickets", {
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
      title: {
        type: Sequelize.DataTypes.STRING(500),
        allowNull: false,
      },
      description: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      priority: {
        type: Sequelize.DataTypes.ENUM("LOW", "MEDIUM", "HIGH"),
        allowNull: false,
      },
      status: {
        type: Sequelize.DataTypes.ENUM("OPEN", "INPROGRESS", "CLOSED"),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("NOW()"),
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("NOW()"),
      },
      deleted_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      }
    });
  },
  down: function ({ context }) {
    const { queryInterface } = context;
    return queryInterface.dropTable("tickets");
  },
};
