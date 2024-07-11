import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { UserTicket, UserTicketId } from "./UserTicket";
import type { Users, UsersId } from "./Users";

export interface TicketsAttributes {
  id: number;
  createdBy: string;
  title: string;
  description?: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "OPEN" | "INPROGRESS" | "CLOSED";
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export type TicketsPk = "id";
export type TicketsId = Tickets[TicketsPk];
export type TicketsOptionalAttributes = "id" | "description" | "created_at" | "updated_at" | "deleted_at";
export type TicketsCreationAttributes = Optional<TicketsAttributes, TicketsOptionalAttributes>;

export class Tickets extends Model<TicketsAttributes, TicketsCreationAttributes> implements TicketsAttributes {
  id!: number;
  createdBy!: string;
  title!: string;
  description?: string;
  priority!: "LOW" | "MEDIUM" | "HIGH";
  status!: "OPEN" | "INPROGRESS" | "CLOSED";
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  // Tickets hasMany UserTicket via ticket
  user_tickets!: UserTicket[];
  getUser_tickets!: Sequelize.HasManyGetAssociationsMixin<UserTicket>;
  setUser_tickets!: Sequelize.HasManySetAssociationsMixin<UserTicket, UserTicketId>;
  addUser_ticket!: Sequelize.HasManyAddAssociationMixin<UserTicket, UserTicketId>;
  addUser_tickets!: Sequelize.HasManyAddAssociationsMixin<UserTicket, UserTicketId>;
  createUser_ticket!: Sequelize.HasManyCreateAssociationMixin<UserTicket>;
  removeUser_ticket!: Sequelize.HasManyRemoveAssociationMixin<UserTicket, UserTicketId>;
  removeUser_tickets!: Sequelize.HasManyRemoveAssociationsMixin<UserTicket, UserTicketId>;
  hasUser_ticket!: Sequelize.HasManyHasAssociationMixin<UserTicket, UserTicketId>;
  hasUser_tickets!: Sequelize.HasManyHasAssociationsMixin<UserTicket, UserTicketId>;
  countUser_tickets!: Sequelize.HasManyCountAssociationsMixin;
  // Tickets belongsTo Users via createdBy
  created_by_user!: Users;
  getCreated_by_user!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setCreated_by_user!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createCreated_by_user!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Tickets {
    return sequelize.define(
      "Tickets",
      {
        id: {
          autoIncrement: true,
          type: DataTypes.BIGINT.UNSIGNED,
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
        },
        status: {
          type: DataTypes.ENUM("OPEN", "INPROGRESS", "CLOSED"),
          allowNull: false,
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
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "createdBy",
            using: "BTREE",
            fields: [{ name: "createdBy" }],
          },
        ],
      }
    ) as typeof Tickets;
  }
}
