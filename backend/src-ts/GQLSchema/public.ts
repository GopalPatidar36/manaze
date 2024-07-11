import GraphQL, { GraphQLObjectType, GraphQLSchema } from "graphql";
import AUTH from "../routes/auth.route";

const RootQuery = new GraphQLObjectType({
  name: "user",
  fields: { ...AUTH.QUERY },
});

const Mutation = new GraphQLObjectType({
  name: "userMT",
  fields: { ...AUTH.MUTATION },
});

const Schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

export default Schema;
