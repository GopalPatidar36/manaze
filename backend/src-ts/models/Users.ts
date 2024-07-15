import * as Sequelize from "sequelize";
import bcrypt from "bcrypt";
import { DataTypes, Model, Optional } from "sequelize";
import type { Tickets, TicketsId } from "./Tickets";
import type { UserTicket, UserTicketId } from "./UserTicket";

export interface UsersAttributes {
  id: number;
  uid?: string;
  user_email: string;
  firstName: string;
  lastName?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  password?: string;
  role: string;
}

export type UsersPk = "id";
export type UsersId = Users[UsersPk];
export type UsersOptionalAttributes = "id" | "uid" | "lastName" | "created_at" | "updated_at" | "deleted_at" | "password";
export type UsersCreationAttributes = Optional<UsersAttributes, UsersOptionalAttributes>;

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  id!: number;
  uid?: string;
  user_email!: string;
  firstName!: string;
  lastName?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  password?: string;
  role!: string;

  // Users hasMany Tickets via created_by
  tickets!: Tickets[];
  getTickets!: Sequelize.HasManyGetAssociationsMixin<Tickets>;
  setTickets!: Sequelize.HasManySetAssociationsMixin<Tickets, TicketsId>;
  addTicket!: Sequelize.HasManyAddAssociationMixin<Tickets, TicketsId>;
  addTickets!: Sequelize.HasManyAddAssociationsMixin<Tickets, TicketsId>;
  createTicket!: Sequelize.HasManyCreateAssociationMixin<Tickets>;
  removeTicket!: Sequelize.HasManyRemoveAssociationMixin<Tickets, TicketsId>;
  removeTickets!: Sequelize.HasManyRemoveAssociationsMixin<Tickets, TicketsId>;
  hasTicket!: Sequelize.HasManyHasAssociationMixin<Tickets, TicketsId>;
  hasTickets!: Sequelize.HasManyHasAssociationsMixin<Tickets, TicketsId>;
  countTickets!: Sequelize.HasManyCountAssociationsMixin;
  // Users hasMany UserTicket via assignee
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
  // Users hasMany UserTicket via created_by
  created_by_user_tickets!: UserTicket[];
  getCreated_by_user_tickets!: Sequelize.HasManyGetAssociationsMixin<UserTicket>;
  setCreated_by_user_tickets!: Sequelize.HasManySetAssociationsMixin<UserTicket, UserTicketId>;
  addCreated_by_user_ticket!: Sequelize.HasManyAddAssociationMixin<UserTicket, UserTicketId>;
  addCreated_by_user_tickets!: Sequelize.HasManyAddAssociationsMixin<UserTicket, UserTicketId>;
  createCreated_by_user_ticket!: Sequelize.HasManyCreateAssociationMixin<UserTicket>;
  removeCreated_by_user_ticket!: Sequelize.HasManyRemoveAssociationMixin<UserTicket, UserTicketId>;
  removeCreated_by_user_tickets!: Sequelize.HasManyRemoveAssociationsMixin<UserTicket, UserTicketId>;
  hasCreated_by_user_ticket!: Sequelize.HasManyHasAssociationMixin<UserTicket, UserTicketId>;
  hasCreated_by_user_tickets!: Sequelize.HasManyHasAssociationsMixin<UserTicket, UserTicketId>;
  countCreated_by_user_tickets!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Users {
    return sequelize.define(
      "Users",
      {
        id: {
          autoIncrement: true,
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        uid: {
          type: DataTypes.CHAR(36),
          allowNull: true,
          unique: "uid",
          defaultValue: DataTypes.UUIDV4,
        },
        userEmail: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: "user_email",
          field: "user_email",
        },
        firstName: {
          type: DataTypes.STRING(100),
          allowNull: false,
          field: "first_name",
        },
        lastName: {
          type: DataTypes.STRING(100),
          allowNull: true,
          field: "last_name",
        },
        fullName: {
          type: DataTypes.VIRTUAL(DataTypes.STRING, ["first_name", "last_name"]),
          get() {
            return `${this.firstName || ""} ${this.lastName || ""}`.replace(/\s+/g, " ");
          },
        },
        role: {
          type: DataTypes.STRING(25),
          allowNull: false,
          defaultValue: "member",
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: true,
          set(value: string) {
            this.setDataValue("password", bcrypt.hashSync(value, 10));
          },
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
        tableName: "users",
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
            name: "user_email",
            unique: true,
            using: "BTREE",
            fields: [{ name: "user_email" }],
          },
          {
            name: "uid",
            unique: true,
            using: "BTREE",
            fields: [{ name: "uid" }],
          },
          {
            name: "unique_firstname_lastnaame",
            unique: true,
            using: "BTREE",
            fields: [{ name: "firstName" }, { name: "lastName" }],
          },
        ],
      }
    ) as typeof Users;
  }
}
