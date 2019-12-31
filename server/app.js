var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mediaRouter = require('./routes/media');
var app = express();

// view engine setup
// remove this code
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

mongoose.connect('mongodb+srv://jshelly:Angulartutorial@cluster0-gnt6p.mongodb.net/test?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/media', mediaRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
