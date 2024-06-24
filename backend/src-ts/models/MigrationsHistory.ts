import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface MigrationsHistoryAttributes {
  name: string;
}

export type MigrationsHistoryPk = "name";
export type MigrationsHistoryId = MigrationsHistory[MigrationsHistoryPk];
export type MigrationsHistoryCreationAttributes = MigrationsHistoryAttributes;

export class MigrationsHistory extends Model<MigrationsHistoryAttributes, MigrationsHistoryCreationAttributes> implements MigrationsHistoryAttributes {
  name!: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof MigrationsHistory {
    return sequelize.define(
      "MigrationsHistory",
      {
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
          primaryKey: true,
        },
      },
      {
        tableName: "migrations_history",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "name" }],
          },
          {
            name: "name",
            unique: true,
            using: "BTREE",
            fields: [{ name: "name" }],
          },
        ],
      }
    ) as typeof MigrationsHistory;
  }
}
