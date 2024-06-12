const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Users.init(sequelize, DataTypes);
}

class Users extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('User', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    uid: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      unique: "uid",
      defaultValue: DataTypes.UUIDV4
    },
    userEmail: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "user_email",
      field: "user_email"
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "first_name"
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "last_name"
    },
    role: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true,
      set(value) {
        this.setDataValue("password", bcrypt.hashSync(value, 10));
      }
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
    tableName: 'users',
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
        name: "user_email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_email" },
        ]
      },
      {
        name: "uid",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "uid" },
        ]
      },
    ]
  });
  }
}
