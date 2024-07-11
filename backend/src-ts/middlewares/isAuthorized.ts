import config from "config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import createError from "http-errors";
const { Users } = config.db.models;
const privateKey = process.env.PRIVATEKEY || fs.readFileSync(path.join(__dirname, "../../private.key"));

let publicRoutes: string[] = ["/public"];

interface DataObject {
  [key: string]: string;
}

export async function isAuthorized(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    req.session = req.session || {};
    if (publicRoutes.includes(req.path)) return next();

    const authorizationHeader = req.headers?.authorization;
    if (!authorizationHeader) return next(createError(401, "Authorization header is missing"));

    const token = req.headers?.authorization?.split(" ").pop();

    if (!token) return next(createError(401, "Token is missing"));

    const decoded = <DataObject>await verifyJwt(token);
    if (!decoded) next(createError(401));

    const _User: any = await Users.findOne({
      where: { userEmail: decoded.userEmail },
    });
    req.session.uid = _User.uid;
    return next();
  } catch (e) {
    next(createError(401));
  }
}

async function verifyJwt(token: string) {
  return jwt.verify(token, privateKey);
}
