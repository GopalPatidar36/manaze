import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { Tickets, TicketsId } from "./Tickets";
import type { Users, UsersId } from "./Users";

export interface UserTicketAttributes {
  id?: number;
  createdBy: string;
  assignee: string;
  ticketId: number;
  createdAt?: Date;
  estimateTime?: number;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type UserTicketPk = "id";
export type UserTicketId = UserTicket[UserTicketPk];
export type UserTicketOptionalAttributes = "id" | "createdAt" | "estimateTime" | "updatedAt" | "deletedAt";
export type UserTicketCreationAttributes = Optional<UserTicketAttributes, UserTicketOptionalAttributes>;

export class UserTicket extends Model<UserTicketAttributes, UserTicketCreationAttributes> implements UserTicketAttributes {
  id!: number;
  createdBy!: string;
  assignee!: string;
  ticketId!: number;
  createdAt?: Date;
  estimateTime?: number;
  updatedAt?: Date;
  deletedAt?: Date;

  // UserTicket belongsTo Tickets via ticket
  ticket_ticket!: Tickets;
  getTicket_ticket!: Sequelize.BelongsToGetAssociationMixin<Tickets>;
  setTicket_ticket!: Sequelize.BelongsToSetAssociationMixin<Tickets, TicketsId>;
  createTicket_ticket!: Sequelize.BelongsToCreateAssociationMixin<Tickets>;
  // UserTicket belongsTo Users via assignee
  assignee_user!: Users;
  getAssignee_user!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setAssignee_user!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createAssignee_user!: Sequelize.BelongsToCreateAssociationMixin<Users>;
  // UserTicket belongsTo Users via created_by
  created_by_user!: Users;
  getCreated_by_user!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setCreated_by_user!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createCreated_by_user!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserTicket {
    return sequelize.define(
      "UserTicket",
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
        assignee: {
          type: DataTypes.CHAR(36),
          allowNull: false,
          references: {
            model: "users",
            key: "uid",
          },
        },
        ticketId: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          field:"ticket",
          references: {
            model: "tickets",
            key: "id",
          },
        },
        estimateTime: {
          type: DataTypes.INTEGER,
          allowNull: true,
          field: "estimate_time"
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
        tableName: "user_ticket",
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
            name: "unique_ticket_assignee",
            unique: true,
            using: "BTREE",
            fields: [{ name: "ticket" }, { name: "assignee" }],
          },
          {
            name: "createdBy",
            using: "BTREE",
            fields: [{ name: "created_by" }],
          },
          {
            name: "assignee",
            using: "BTREE",
            fields: [{ name: "assignee" }],
          },
        ],
      }
    ) as typeof UserTicket;
  }
}
