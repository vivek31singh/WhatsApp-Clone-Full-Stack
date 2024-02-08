var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session');
var socketServer = require('./routes/sockets');  // Import the socket server

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var socketsRouter = require('./routes/sockets');
// Remove the socketRouter import

var app = express();

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'your-secret-key',
  cookie: {
    maxAge: 30 * 60 * 1000, // 30 minutes in milliseconds
  }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sockets', socketsRouter);
app.use('/uploads', express.static('uploads'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Integrate the socket server
socketServer(app);

module.exports = app;
