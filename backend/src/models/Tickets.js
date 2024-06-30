const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return Tickets.init(sequelize, DataTypes);
};

class Tickets extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return sequelize.define(
      "Ticket",
      {
        id: {
          autoIncrement: true,
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
        },
        createdBy: {
          type: DataTypes.CHAR(36),
          allowNull: false,
          field: "created_by",
          references: {
            model: "users",
            key: "uid",
          },
        },
        title: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        priority: {
          type: DataTypes.ENUM("LOW", "MEDIUM", "HIGH"),
          allowNull: false,
          defaultValue: "LOW",
        },
        status: {
          type: DataTypes.ENUM("OPEN", "INPROGRESS", "CLOSED"),
          allowNull: false,
          defaultValue: "OPEN",
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: DataTypes.NOW,
          field: "created_at",
          validate: { isDate: true },
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: DataTypes.NOW,
          field: "updated_at",
          validate: { isDate: true },
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          field: "deleted_at",
          validate: { isDate: true },
        },
      },
      {
        tableName: "tickets",
        timestamps: true,
        paranoid: true,
        hooks:{
          afterDestroy: function (instance, options) {
            // eslint-disable-next-line promise/catch-or-return
            instance.getUserTickets().then(async ticketUsers => {
              for (const eu of ticketUsers) {
                await eu.destroy();
              }
              return options;
            });
          },
        },
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "created_by",
            using: "BTREE",
            fields: [{ name: "created_by" }],
          },
        ],
      }
    );
  }
}
