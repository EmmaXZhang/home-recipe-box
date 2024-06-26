var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var passport = require("passport");
var methodOverride = require("method-override");
const mongoStore = require("connect-mongo");
require("dotenv").config();
//require database
require("./config/database");
require("./config/passport");
const bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var recipesRouter = require("./routes/recipes");
var shoppinglistsRouter = require("./routes/shoppinglists");
var reviewsRouter = require("./routes/reviews");
var inspireMeRouter = require("./routes/inspireMe");
var plannersRouter = require("./routes/planners");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// show images
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({
      mongoUrl: process.env.DATABASE_URL,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride("_method"));

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/recipes", recipesRouter);
app.use("/", reviewsRouter);
app.use("/shoppinglists", shoppinglistsRouter);
app.use("/inspireMe", inspireMeRouter);

app.use("/planners", plannersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

if (process.env.NODE_ENV === "production") {
  app.set("views", path.join(__dirname, "views"));
} else {
  app.set("views", path.join(__dirname, "views"));
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

module.exports = app;
