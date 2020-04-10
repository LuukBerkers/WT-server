var express = require('express');
var router = express.Router();
var sqlite = require('sqlite3');
const crypto = require('crypto');

var dbFile = 'database.db';
db = new sqlite.Database(dbFile);

router.get('/', function (req, res, next) {
  if (!req.session.loggedin) {
    res.render('register');
  } else {
    res.redirect('user');
  }
});

router.post('/', function (req, res) {
  var student;
  try {
    student = {
      email: req.body.email,
      password: crypto
        .createHash('sha256')
        .update(req.body.password)
        .digest('hex'),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      program: req.body.program,
      level: req.body.level,
    };
  } catch (e) {
    res.status(400).send();
    throw e;
  }
  var insertion = db.prepare(`
    INSERT INTO Students(
      email,
      password,
      firstname,
      lastname,
      program,
      level
    )
    VALUES (?, ?, ?, ?, ?, ?);
  `);

  insertion.run(
    [
      student.email,
      student.password,
      student.first_name,
      student.last_name,
      student.program,
      student.level,
    ],
    function (err) {
      if (err) {
        console.error(err);
        if (err.errno === 19) {
          res.status(400).send('Email address is already registered');
        } else {
          res.status(500).send({ error: 'Internal server error' });
        }
      } else {
        req.session.loggedin = true;
        req.session.email = student.email;
        res.redirect('user');
      }
    }
  );

  db.each(`SELECT * FROM Students`, [], (err, tuple) => {
    console.log(tuple);
  });
});

router.get('/succes', function (req, res, next) {
  res.render('registerusersucces');
});

module.exports = router;
