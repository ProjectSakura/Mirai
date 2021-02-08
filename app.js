var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var loadRouter = require('./routes/loadpage');
var videoRouter = require('./routes/loadvideo');
var animeList = require('./routes/animelist');
var searchRoute = require('./routes/search');
var loadManga = require('./routes/loadmanga');
var loadChapter = require('./routes/viewmanga');
var loadPopular = require('./routes/loadpopular');
var loadLatest = require('./routes/loadlatest');
var loaderRoute = require('./routes/loader');
var hotmangaRoute = require('./routes/hotmanga');
var hotmangaloaderRoute = require('./routes/hotloader');
var newmangaRoute = require('./routes/newmanga');
var newmangaloaderRoute = require('./routes/newloader');
var testRoute = require('./routes/test');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/loadpage', loadRouter);
app.use('/loadvideo', videoRouter);
app.use('/animelist', animeList);
app.use('/search', searchRoute);
app.use('/loadmanga', loadManga);
app.use('/loadpopular', loadPopular);
app.use('/viewmanga', loadChapter);
app.use('/loadlatest', loadLatest);
app.use('/loader', loaderRoute);
app.use('/hotmanga', hotmangaRoute);
app.use('/hotloader', hotmangaloaderRoute);
app.use('/newmanga', newmangaRoute);
app.use('/newloader', newmangaloaderRoute);
app.use('/test', testRoute);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
