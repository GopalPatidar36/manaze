const DataTypes = require("sequelize").DataTypes;
const _MigrationsHistory = require("./MigrationsHistory");
const _Tickets = require("./Tickets");
const _UserTicket = require("./UserTicket");
const _Users = require("./Users");

function initModels(sequelize) {
  const MigrationsHistory = _MigrationsHistory(sequelize, DataTypes);
  const Tickets = _Tickets(sequelize, DataTypes);
  const UserTicket = _UserTicket(sequelize, DataTypes);
  const Users = _Users(sequelize, DataTypes);

  UserTicket.belongsTo(Tickets, { as: "ticket_ticket", foreignKey: "ticket"});
  Tickets.hasMany(UserTicket, { as: "userTickets", foreignKey: "ticket"});
  Tickets.belongsTo(Users, { as: "created_by_user", foreignKey: "created_by"});
  Users.hasMany(Tickets, { as: "tickets", foreignKey: "created_by"});
  UserTicket.belongsTo(Users, { as: "created_by_user", foreignKey: "created_by"});
  Users.hasMany(UserTicket, { as: "user_tickets", foreignKey: "created_by"});
  UserTicket.belongsTo(Users, { as: "assignee_user", foreignKey: "assignee"});
  Users.hasMany(UserTicket, { as: "assignee_user_tickets", foreignKey: "assignee"});

  return {
    MigrationsHistory,
    Tickets,
    UserTicket,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
