import GraphQL, { GraphQLList, GraphQLString } from "graphql";
import UserTypeDef from "../TypeDef/user";
import config from "config";
import createError from "http-errors";
import { filterModelData } from "../utils/routeUtil";
const { Users } = config.db.models;

interface DataObject {
  [key: string]: string;
}
async function getCurrent(parent: any, req: any) {
  const _User = await Users.findOne({
    where: { uid: parent.session.uid },
  });
  if (!_User) return createError(404);
  return _User;
}

async function get(req: any) {
  try {
    const { limit = 20, offset = 0 } = req;
    const _User = await Users.findAndCountAll({
      offset: Number(offset),
      limit: Number(limit),
      where: filterModelData({ model: Users, data: <DataObject>req }),
    });
    return _User;
  } catch (err) {
    return err;
  }
}

async function getById(req: any) {
  try {
    const _User = await Users.findOne({
      where: { uid: req.uid },
    });
    if (!_User) return createError(404);

    return _User;
  } catch (err) {
    return err;
  }
}

async function create(req: any) {
  try {
    const _User: any = await Users.create(req);
    return _User;
  } catch (err) {
    return err;
  }
}

// async function update(req: Request, res: Response, next: NextFunction) {
async function update(args: any) {
  try {
    const _User = await Users.findOne({ where: { uid: args.uid } });
    if (!_User) {
      return createError(404);
    }
    const { $and: values } = filterModelData({ model: Users, data: args });
    for (const entry of values) {
      for (const [k, v] of Object.entries(entry)) {
        (_User as any)[k] = v;
      }
    }
    await _User.save();
  } catch (err) {
    return err;
  }
}

async function deleteById(req: any) {
  try {
    await Users.destroy({ where: { uid: req.uid } });
  } catch (err) {
    return err;
  }
}

export const ME = {
  type: UserTypeDef.UserType,
  args: {
    userEmail: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
  },
  resolve(parent: any, req: any) {
    return getCurrent(parent, req);
  },
};

export const USERSEARCH = {
  type: UserTypeDef.UserSearchResultType,
  args: {
    userEmail: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
  },
  resolve(parent: any, req: any) {
    return get(req);
  },
};

export const FINDONE = {
  type: new GraphQLList(UserTypeDef.UserType),
  args: {
    uid: { type: GraphQLString },
  },
  resolve(parent: any, args: any) {
    return getById(args);
  },
};

export const CREATEUSER = {
  type: UserTypeDef.UserType,
  args: {
    userEmail: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve(parent: any, args: any) {
    return create(args);
  },
};

export const UPDATEUSER = {
  type: UserTypeDef.UserType,
  args: {
    uid: { type: GraphQLString },
    userEmail: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve(parent: any, args: any) {
    return update(args);
  },
};

export const DELETEUSER = {
  type: UserTypeDef.UserType,
  args: {
    uid: { type: GraphQLString },
  },
  resolve(parent: any, args: any) {
    return deleteById(args);
  },
};

export default {
  MUTATION: {
    createUser: CREATEUSER,
    deleteUser: DELETEUSER,
    updateUser: UPDATEUSER,
  },
  QUERY: {
    me: ME,
    userList: USERSEARCH,
    userById: FINDONE,
  },
};
