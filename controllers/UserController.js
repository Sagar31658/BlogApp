const mongoose = require("mongoose");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");

mongoose.Promise = global.Promise;

exports.getSignupPage = (req, res) => {
  res.render("signup.ejs");
};

exports.postSignup = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then(hashPass => {
      let user = new User({
          Email: req.body.email,
          Password: hashPass
        })
        .save()
        .then(user => {
          console.log("user created!");
          res.redirect("/login");
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getLoginPage = (req, res) => {
  res.render("login.ejs");
};

exports.postLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
      Email: email
    })
    .then(user => {
      bcrypt
        .compare(password, user.Password)
        .then(user => {
          req.session.isLoggedin = true;
          req.session.user = user;
          req.session.save();
          console.log("user loggged in!");
          res.redirect("/");
        })
        .catch(err => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/login');
  })
};