var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var touristRouter = require('./routes/tourist');
var bureauRouter = require('./routes/bureau');
var agencyRouter = require('./routes/agency');
var spotRouter = require('./routes/spot');
var groupRouter = require('./routes/group');
var consistRouter = require('./routes/consist');
var appointmentRouter = require('./routes/appointment');
var orderRouter = require('./routes/order');

var app = express();

//增加头部信息解决跨域问题
app.all('*', function (req, res, next){
  res.header("Access-Control-Allow-Origin", req.headers.origin);//允许源访问，本利前端访问路径为“http://localhost:8080”
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/tourist', touristRouter);
app.use('/bureau', bureauRouter);
app.use('/agency', agencyRouter);
app.use('/spot', spotRouter);
app.use('/group', groupRouter);
app.use('/consist', consistRouter);
app.use('/appointment', appointmentRouter);
app.use('/order', orderRouter);

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
