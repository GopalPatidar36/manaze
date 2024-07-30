import GraphQl, { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from "graphql";

const UserType = new GraphQLObjectType({
  name: "userFields",
  fields: () => ({
    id: { type: GraphQLInt },
    uid: { type: GraphQLString },
    userEmail: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    fullName: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const UserList = new GraphQLObjectType({
  name: "userList",
  fields: () => ({
    count: { type: GraphQLInt },
    rows: { type: new GraphQLList(UserType) },
  }),
});

export default {
  UserType,
  UserList,
};
