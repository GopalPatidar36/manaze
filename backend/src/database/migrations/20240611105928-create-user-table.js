"use strict";

module.exports = {
  up: function ({ context }) {
    const { queryInterface, Sequelize } = context;

    return queryInterface.createTable("users", {
      id: {
        autoIncrement: true,
        type: Sequelize.DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      uid: {
        type: Sequelize.DataTypes.UUID,
        allowNull: true,
        unique: true,
        defaultValue: Sequelize.DataTypes.UUIDV4,
      },
      user_email: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      first_name: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: true,
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
      },
      password: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: true,
      },
      role: {
        type: Sequelize.DataTypes.STRING(25),
        allowNull: false,
      },
    });
  },
  down: function ({ context }) {
    const { queryInterface } = context;
    return queryInterface.dropTable("users");
  },
};
