var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var auth = require('./auth');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var loginRouter = require('./routes/login');
var coursesRouter = require('./routes/courses');
var registerRouter = require('./routes/register');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: '7MyUpOgiImJYnsx6J3f4QVWPo/I=', //This probably should be in a seperate file, which is in the .gitignore
	resave: true,
	saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/user', auth.loginRequired, userRouter); //If all paths require login, we can put it here as well
app.use('/login', loginRouter);
app.use('/courses', coursesRouter);
app.use('/register', registerRouter);

module.exports = app;
