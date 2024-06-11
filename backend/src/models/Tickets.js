const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Tickets.init(sequelize, DataTypes);
}

class Tickets extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('Tickets', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    created_by: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'users',
        key: 'uid'
      }
    },
    title: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    priority: {
      type: DataTypes.ENUM('LOW','MEDIUM','HIGH'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('OPEN','INPROGRESS','CLOSED'),
      allowNull: false
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
    tableName: 'tickets',
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
    ]
  });
  }
}
