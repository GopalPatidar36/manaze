const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return UserTicket.init(sequelize, DataTypes);
}

class UserTicket extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('UserTicket', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    createdBy: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      field:"created_by",
      references: {
        model: 'users',
        key: 'uid'
      }
    },
    assignee: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'users',
        key: 'uid'
      }
    },
    ticketId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      field:"ticket",
      references: {
        model: 'tickets',
        key: 'id'
      }
    },
    estimate_time: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
      validate: { isDate: true }
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
      field: 'updated_at',
      validate: { isDate: true }
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'deleted_at',
      validate: { isDate: true }
    },
  }, {
    tableName: 'user_ticket',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "created_by",
        using: "BTREE",
        fields: [
          { name: "created_by" },
        ]
      },
      {
        name: "assignee",
        using: "BTREE",
        fields: [
          { name: "assignee" },
        ]
      },
      {
        name: "ticket",
        using: "BTREE",
        fields: [
          { name: "ticket" },
        ]
      },
    ]
  });
  }
}
