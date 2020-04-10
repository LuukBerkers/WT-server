var express = require('express');
var router = express.Router();
var auth = require('../auth');
var sqlite = require('sqlite3');
const crypto = require('crypto');

var dbFile = 'database.db';
db = new sqlite.Database(dbFile);

router.get('/', function (req, res, next) {
  if (!req.session.loggedin) {
    if (req.session.error) {
      var error = req.session.error;
      req.session.error = undefined;
      res.render('login', { error: error });
    } else {
      res.render('login', { error: '' });
    }
  } else {
    res.redirect('user');
  }
});

router.post('/', function (req, res) {
  var email = req.body.email;
  var password = crypto
    .createHash('sha256')
    .update(req.body.password)
    .digest('hex');
  console.log(password);
  if (email && password) {
    var query = db.prepare(
      `SELECT * FROM Students WHERE email = ? AND password = ?;`
    );
    query.get([email, password], (err, tuple) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
      } else if (tuple) {
        req.session.loggedin = true;
        req.session.email = email;
        res.redirect('user');
      } else {
        res.render('login', { error: 'Incorrect Email and/or Password!' });
      }
    });
  } else {
    res.render('login', { error: 'Please enter email and password!' });
  }
});
module.exports = router;
