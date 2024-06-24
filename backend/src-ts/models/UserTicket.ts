import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Tickets, TicketsId } from './Tickets';
import type { Users, UsersId } from './Users';

export interface UserTicketAttributes {
  id: number;
  created_by: string;
  assignee: string;
  ticket: number;
  created_at?: Date;
  estimate_time?: number;
  updated_at?: Date;
  deleted_at?: Date;
}

export type UserTicketPk = "id";
export type UserTicketId = UserTicket[UserTicketPk];
export type UserTicketOptionalAttributes = "id" | "created_at" | "estimate_time" | "updated_at" | "deleted_at";
export type UserTicketCreationAttributes = Optional<UserTicketAttributes, UserTicketOptionalAttributes>;

export class UserTicket extends Model<UserTicketAttributes, UserTicketCreationAttributes> implements UserTicketAttributes {
  id!: number;
  created_by!: string;
  assignee!: string;
  ticket!: number;
  created_at?: Date;
  estimate_time?: number;
  updated_at?: Date;
  deleted_at?: Date;

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
    return sequelize.define('UserTicket', {
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
    assignee: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'users',
        key: 'uid'
      }
    },
    ticket: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'tickets',
        key: 'id'
      }
    },
    estimate_time: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
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
        name: "unique_ticket_assignee",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ticket" },
          { name: "assignee" },
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
    ]
  }) as typeof UserTicket;
  }
}
