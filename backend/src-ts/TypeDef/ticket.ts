import GraphQl, { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from "graphql";

const UserTicket = new GraphQLObjectType({
  name: "UserTicket",
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    uid: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    fullName: { type: GraphQLString },
  }),
});

const TicketsType = new GraphQLObjectType({
  name: "Ticket",
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    priority: { type: GraphQLString },
    status: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    ticketUsersDetails: { type: new GraphQLList(UserTicket) },
  }),
});

const TicketListTypes = new GraphQLObjectType({
  name: "TicketList",
  fields: () => ({
    count: { type: GraphQLInt },
    rows: { type: new GraphQLList(TicketsType) },
  }),
});

export default { TicketsType, TicketListTypes };
