import GraphQL, { GraphQLObjectType, GraphQLSchema } from "graphql";

import { USERSEARCH, CREATEUSER, DELETEUSER, UPDATEUSER, FINDONE } from "../routes/user.route";
import TICKET from "../routes/ticket.route";

const RootQuery = new GraphQLObjectType({
  name: "user",
  fields: {
    userList: USERSEARCH,
    userById: FINDONE,
    ...TICKET.QUERY,
  },
});

const Mutation = new GraphQLObjectType({
  name: "userMT",
  fields: {
    createUser: CREATEUSER,
    deleteUser: DELETEUSER,
    updateUser: UPDATEUSER,
    ...TICKET.MUTATION,
  },
});

const Schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

export default Schema;
