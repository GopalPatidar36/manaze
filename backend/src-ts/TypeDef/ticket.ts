import GraphQl, { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";

const TicketsType = new GraphQLObjectType({
  name: "ticketFields",
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    priority: { type: GraphQLString },
    status: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

export default TicketsType;
