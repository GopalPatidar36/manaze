import config from "config";
import jsonwebtoken from "jsonwebtoken";
import fs from "fs";
import path from "path";
import createError from "http-errors";
import bcrypt from "bcrypt";
const privateKey = process.env.PRIVATEKEY || fs.readFileSync(path.join(__dirname, "../../private.key"));
const { Users } = config.db.models;

import GraphQl, { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";

const RegistrationType = new GraphQLObjectType({
  name: "RegistrationType",
  fields: () => ({
    uid: { type: GraphQLString },
    userEmail: { type: GraphQLString },
    password: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
  }),
});

const LoginTypes = new GraphQLObjectType({
  name: "LoginTypes",
  fields: () => ({
    user: { type: RegistrationType },
    token: { type: GraphQLString },
  }),
});

async function login(req: { userEmail: string; password: string }) {
  try {
    const _User: any = await Users.findOne({
      where: { userEmail: req.userEmail },
    });
    const pass = bcrypt.compareSync(req.password, _User.password);
    if (!_User || !pass) return createError(404);
    var token = jsonwebtoken.sign({ userEmail: _User.userEmail }, privateKey, {
      algorithm: "RS256",
      expiresIn: "1h",
    });
    const { password, ...rest } = _User.dataValues;
    return { token, user: rest };
  } catch (err) {
    return err;
  }
}

async function register(req: any) {
  try {
    const _User: any = await Users.create(req);
    return _User;
  } catch (err) {
    return err;
  }
}

export const LOGIN = {
  type: LoginTypes,
  args: {
    userEmail: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve(parent: any, args: any) {
    return login(args);
  },
};

export const REGISTRATION = {
  type: RegistrationType,
  args: {
    userEmail: { type: GraphQLString },
    password: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
  },
  resolve(parent: any, args: any) {
    return register(args);
  },
};

export default {
  QUERY: { login: LOGIN },
  MUTATION: { registration: REGISTRATION },
};
