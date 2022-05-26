const express = require("express");

const User = require("../app/schemas/user");
const userController = require("../app/controllers/user");
const auth = require("../app/middlewares/auth");

const router = new express.Router();
router.post("/signup", userController.handleSignUp);
router.post("/login", userController.handleLogin);
router.get("/logout", auth, userController.handleLogout);
module.exports = router;
