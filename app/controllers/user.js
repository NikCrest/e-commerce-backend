const JWT = require("jsonwebtoken");
const env = require("dotenv");
const Admin = require("../schemas/admin");
const Merchant = require("../schemas/merchants");

env.config();

const User = require("../schemas/user");
const httpError = require("../../models/http-error");

const handleSignUp = async (req, res, next) => {
  let user, alreadyExists;
  try {
    if (req.body.role === "admin") {
      alreadyExists = await Admin.find({ email: req.body.email });
      if (alreadyExists.length !== 0) {
        const error = new httpError(
          "Admin account already exists with this email!",
          500
        );
        return next(error);
      }
      user = new Admin(req.body);
    }
    if (req.body.role === "user") {
      alreadyExists = await User.find({ email: req.body.email });
      if (alreadyExists.length !== 0) {
        const error = new httpError(
          "Admin account already exists with this email!",
          500
        );
        return next(error);
      }
      user = new User(req.body);
    }
    if (req.body.role === "merchant") {
      alreadyExists = await Merchant.find({ email: req.body.email });
      if (alreadyExists.length !== 0) {
        const error = new httpError(
          "Admin account already exists with this email!",
          500
        );
        return next(error);
      }
      user = new Merchant(req.body);
      user.blocked = false;
    }

    const token = JWT.sign(
      { email: user.email, id: user.id },
      process.env.JWT_SECRET_KEY
    );

    user.token = token;
    await user.save();
    res.status(201).send({ status: true, message: "Signedup successfully." });
  } catch (error) {
    const err = new httpError("Something wrong happend", 500);
    return next(err);
  }
};
const handleLogin = async (req, res, next) => {
  let user;
  try {
    if (req.body.role === "admin") {
      user = await Admin.findOne({
        email: req.body.email,
      });
      if (!user) {
        return next(
          new httpError(
            "Admin account with this email not found please signup.",
            404
          )
        );
      }
      if (user.password !== req.body.password) {
        return next(new httpError("Invalid credentials.", 401));
      }
    }
    if (req.body.role === "merchant") {
      user = await Merchant.findOne({
        email: req.body.email,
      });
      if (!user) {
        return next(
          new httpError(
            "Merchant account with this email not found please signup.",
            404
          )
        );
      }
      if (user.password !== req.body.password) {
        return next(new httpError("Invalid credentials.", 401));
      }
    }
    if (req.body.role === "user") {
      user = await User.findOne({
        email: req.body.email,
      });
      if (!user) {
        return next(
          new httpError(
            "User account with this email not found please signup.",
            404
          )
        );
      }
      if (user.password !== req.body.password) {
        return next(new httpError("Invalid credentials.", 401));
      }
    }
    const token = JWT.sign(
      { email: user.email, id: user.id, role: req.body.role },
      process.env.JWT_SECRET_KEY
    );
    user.token = token;
    await user.save();
    res.send({
      status: true,
      message: "Logged in successfully",
      data: { token },
    });
    res.send(user);
  } catch (e) {
    return next(new httpError("Something went wrong", 500));
  }
};
const handleLogout = async (req, res, next) => {
  let user;
  try {
    if (req.role === "admin") {
      user = await Admin.findById(req.id);
    }
    if (req.role === "merchant") {
      user = await Merchant.findById(req.id);
    }
    if (req.role === "user") {
      user = await User.findById(req.id);
    }
    if (!user.token) {
      const error = new httpError("User already logged out!", 401);
      next(error);
    }
    user.token = "";
    await user.save();
    res.send({ status: true, message: "User logged out successfully" });
  } catch (e) {
    const error = new httpError("Something went wrong!", 500);
    return next(error);
  }
};
module.exports = { handleSignUp, handleLogin, handleLogout };
