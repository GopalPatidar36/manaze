import GraphQl, { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from "graphql";

const TicketsType = new GraphQLObjectType({
  name: "Ticket",
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    priority: { type: GraphQLString },
    status: { type: GraphQLString },
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
