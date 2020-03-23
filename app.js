const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const BlogRoutes = require("./routes/BlogRoutes.js");
const UserRoutes = require("./routes/UserRoutes.js");

mongoose.Promise = global.Promise;

const app = express();

const store = new MongoDBStore({
  uri: "mongodb://localhost:27017/crash",
  collection: "session"
});

app.use(
  bodyparser.urlencoded({
    extended: false
  })
);
app.set("view engine", "ejs");

app.use(
  session({
    secret: "hey i am secreat key",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use(UserRoutes);
app.use(BlogRoutes);

mongoose
  .connect("mongodb://localhost:27017/crash", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("database connected!");
  })
  .catch(err => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server is running!");
});
