var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var auth = require('./auth');
var fs = require('fs');
var sqlite = require('sqlite3').verbose();
var dbDef = require('./dbdef');

var dbFile = 'database.db';
var exists = fs.existsSync(dbFile);
db = new sqlite.Database(dbFile);

db.serialize(async function () {
  if (!exists) {
    await dbDef.dbInit(db);
  }
  db.close();
});

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var loginRouter = require('./routes/login');
var coursesRouter = require('./routes/courses');
var registerRouter = require('./routes/register');

var app = express();
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: process.env.SESSION_SECRET, //Normally start.sh would be gitignored, and the session secret hidden
    resave: true,
    saveUninitialized: true,
  })
);

app.use('/', indexRouter);
app.use('/user', auth.loginRequired, userRouter); //If all paths require login, we can put it here as well
app.use('/login', loginRouter);
app.use('/courses', coursesRouter);
app.use('/register', registerRouter);

module.exports = app;
