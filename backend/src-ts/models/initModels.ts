import type { Sequelize } from "sequelize";
import { MigrationsHistory as _MigrationsHistory } from "./MigrationsHistory";
import type { MigrationsHistoryAttributes, MigrationsHistoryCreationAttributes } from "./MigrationsHistory";
import { Tickets as _Tickets } from "./Tickets";
import type { TicketsAttributes, TicketsCreationAttributes } from "./Tickets";
import { UserTicket as _UserTicket } from "./UserTicket";
import type { UserTicketAttributes, UserTicketCreationAttributes } from "./UserTicket";
import { Users as _Users } from "./Users";
import type { UsersAttributes, UsersCreationAttributes } from "./Users";

export { _MigrationsHistory as MigrationsHistory, _Tickets as Tickets, _UserTicket as UserTicket, _Users as Users };

export type {
  MigrationsHistoryAttributes,
  MigrationsHistoryCreationAttributes,
  TicketsAttributes,
  TicketsCreationAttributes,
  UserTicketAttributes,
  UserTicketCreationAttributes,
  UsersAttributes,
  UsersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const MigrationsHistory = _MigrationsHistory.initModel(sequelize);
  const Tickets = _Tickets.initModel(sequelize);
  const UserTicket = _UserTicket.initModel(sequelize);
  const Users = _Users.initModel(sequelize);

  Tickets.belongsToMany(Users, { as: 'ticketUsersDetails', through: UserTicket, foreignKey: 'ticket', otherKey: 'assignee', targetKey: 'uid' });

  UserTicket.belongsTo(Tickets, { as: "ticket_ticket", foreignKey: "ticket" });
  Tickets.hasMany(UserTicket, { as: "userTickets", foreignKey: "ticket" });
  Tickets.belongsTo(Users, { as: "created_by_user", foreignKey: "created_by" });
  Users.hasMany(Tickets, { as: "tickets", foreignKey: "created_by", sourceKey: "uid" });
  UserTicket.belongsTo(Users, { as: "assignee_user", foreignKey: "assignee" });
  Users.hasMany(UserTicket, { as: "user_tickets", foreignKey: "assignee" });
  UserTicket.belongsTo(Users, { as: "created_by_user", foreignKey: "created_by" });
  Users.hasMany(UserTicket, { as: "created_by_user_tickets", foreignKey: "created_by" });

  return {
    MigrationsHistory: MigrationsHistory,
    Tickets: Tickets,
    UserTicket: UserTicket,
    Users: Users,
  };
}
