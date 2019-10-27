const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const helmet = require("helmet");
const passport = require("passport");

const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const langRouter = require("./routes/lang");
const packageRouter = require("./routes/package");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(helmet());
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "key",
    cookie: { maxAge: 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

const authenticateUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(301).redirect("/login");
  }
};

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/lang", authenticateUser, langRouter);
app.use("/package", authenticateUser, packageRouter);

// [ CONFIGURE mongoose ]

// CONNECT TO MONGODB SERVER
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", () => {
  // CONNECTED TO MONGODB SERVER
  console.log("Connected to mongod server");
});

mongoose.connect("mongodb+srv://node_1:node_1@cluster0-rkn4e.mongodb.net/test?retryWrites=true&w=majority");

// catch 404 and forward to error handler
app.use(next => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { status: err.status, stack: err.stack });
});

app.listen(5000);

module.exports = app;
