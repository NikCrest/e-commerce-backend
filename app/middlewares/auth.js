const JWT = require("jsonwebtoken");
const env = require("dotenv");
const HttpError = require("../../models/http-error");
const User = require("../schemas/user");
env.config();
const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);
    req.id = decoded.id;
    req.email = decoded.email;
    req.role = decoded.role;
    next();
  } catch (e) {
    const error = new HttpError(e, 401);
    return next(error);
  }
};

module.exports = auth;
