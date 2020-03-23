const express = require("express");
const router = express.Router();

const isAuth = require('../isAuth/auth');

const UserController = require("../controllers/UserController");

router.get("/signup", UserController.getSignupPage);

router.post("/signup", UserController.postSignup);

router.get("/login", UserController.getLoginPage);

router.post("/login", UserController.postLogin);

router.get("/logout", isAuth, UserController.logout);

module.exports = router;