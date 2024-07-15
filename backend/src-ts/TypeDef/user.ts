import GraphQl, { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from "graphql";

const UserType = new GraphQLObjectType({
  name: "userFields",
  fields: () => ({
    id: { type: GraphQLInt },
    uid: { type: GraphQLString },
    userEmail: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const UserSearchResultType = new GraphQLObjectType({
  name: "UserSearchResult",
  fields: () => ({
    count: { type: GraphQLInt },
    rows: { type: new GraphQLList(UserType) },
  }),
});

export default {
  UserType,
  UserSearchResultType,
};
