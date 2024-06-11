const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return MigrationsHistory.init(sequelize, DataTypes);
}

class MigrationsHistory extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('MigrationsHistory', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'migrations_history',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
  }
}
