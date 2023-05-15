//Require express for initialize the server
const express = require("express");
const app = express();
const path = require("path");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");

//Morgan shows the http requests on console
const morgan = require("morgan");

//Database
require("./database");

//Settings
app.set("port", 3000 || process.env.PORT);
app.set("views", path.join(__dirname, "views"));

//Global Variables
global.loggedIn = null;

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(
  expressSession({
    secret: process.env.SECRET_EXPRESS_SESSION,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(fileUpload());
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});
//app.use((req, res) => res.render("notfound"));

//Routes
app.use(require("./routes/index.routes"));

module.exports = app;
