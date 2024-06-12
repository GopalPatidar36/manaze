const jwt = require("jsonwebtoken");
const config = require("config");
const fs = require("fs");
const path = require("path");
const { User } = config.db.models;
const createError = require("http-errors");
const { verify } = require("crypto");
const privateKey = fs.readFileSync(path.join(__dirname, "../../private.key"));

const publicRoutes = ["/auth/login", "/auth/register"];
async function isAuthorized(req, res, next) {
  try {
    req.session = res.session || {};
    if (publicRoutes.includes(req.path)) return next();
    const token = req.headers?.authorization?.split(" ").pop();

    const decoded = await verifyJwt(token);
    if (!decoded) next(createError(401));

    const _User = await User.findOne({
      where: { userEmail: decoded.userEmail },
    });
    req.session.uid = _User.uid;
    return next();
  } catch (e) {
    next(createError(401));
  }
}

async function verifyJwt(token) {
  return jwt.verify(token, privateKey);
}

module.exports = isAuthorized;
