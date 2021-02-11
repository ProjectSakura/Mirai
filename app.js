const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const loadRouter = require("./routes/loadpage");
const videoRouter = require("./routes/loadvideo");
const animeList = require("./routes/animelist");
const searchRoute = require("./routes/search");
const loadManga = require("./routes/loadmanga");
const loadChapter = require("./routes/viewmanga");
const loadLatest = require("./routes/loadlatest");
const loaderRoute = require("./routes/loader");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/loadpage", loadRouter);
app.use("/loadvideo", videoRouter);
app.use("/animelist", animeList);
app.use("/search", searchRoute);
app.use("/loadmanga", loadManga);
app.use("/viewmanga", loadChapter);
app.use("/loadlatest", loadLatest);
app.use("/loader", loaderRoute);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
