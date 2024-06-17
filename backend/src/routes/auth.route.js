const router = require("express").Router();
const config = require("config");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const privateKey = fs.readFileSync(path.join(__dirname, "../../private.key"));

const { User } = config.db.models;

async function login(req, res, next) {
  try {
    const _User = await User.findOne({
      where: { userEmail: req.body.userEmail },
    });
    const pass = bcrypt.compareSync(req.body.password, _User?.password);
    if (!_User || !pass) return next(createError(404));
    var token = jsonwebtoken.sign({ userEmail: _User.userEmail }, privateKey, {
      algorithm: "RS256",
      expiresIn: "1h",
    });
    const { password, ...rest } = _User.dataValues;
    res.json({ token, user: rest });
  } catch (err) {
    next(err);
  }
}

router.post("/login", login);

module.exports = router;
