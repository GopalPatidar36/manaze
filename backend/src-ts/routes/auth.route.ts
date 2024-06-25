import { Router, Request, Response, NextFunction } from "express";
import config from "config";
import jsonwebtoken from "jsonwebtoken";
import fs from "fs";
import path from "path";
import createError from "http-errors";
import bcrypt from "bcrypt";
const privateKey = process.env.PRIVATEKEY || fs.readFileSync(path.join(__dirname, "../../private.key"));
const { Users } = config.db.models;
const router = Router();

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const _User: any = await Users.findOne({
      where: { userEmail: req.body.userEmail },
    });
    const pass = bcrypt.compareSync(req.body.password, _User.password);
    if (!_User || !pass) return next(createError(404));
    var token = jsonwebtoken.sign({ userEmail: _User.userEmail }, privateKey, {
      algorithm: "RS256",
      expiresIn: "1h",
    });
    const ticket:any=await _User.getTickets();
    const ticket1:any=await _User.getUser_tickets();
    const { password, ...rest } = _User.dataValues;
    res.json({ token, user: rest,ticket,ticket1 });
  } catch (err) {
    next(err);
  }
}

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const _User:any = await Users.create(req.body);
    res.status(201).json({ id: _User.id });
  } catch (err) {
    next(err);
  }
}

router.post("/login", login);
router.put("/register", register);

module.exports = router;
