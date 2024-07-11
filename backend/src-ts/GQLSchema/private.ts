import GraphQL, { GraphQLObjectType, GraphQLSchema } from "graphql";

import User from "../routes/user.route";
import TICKET from "../routes/ticket.route";

const RootQuery = new GraphQLObjectType({
  name: "user",
  fields: {
    ...User.QUERY,
    ...TICKET.QUERY,
  },
});

const Mutation = new GraphQLObjectType({
  name: "userMT",
  fields: {
    ...User.MUTATION,
    ...TICKET.MUTATION,
  },
});

const Schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

export default Schema;
