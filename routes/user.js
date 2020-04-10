var express = require('express');
var router = express.Router();
var auth = require('../auth');

router.get('/', function (req, res, next) {
  var email = req.session.email; //Gets the user that is logged in atm by email
  if (email) {
    var query = db.prepare(`SELECT * FROM Students WHERE email = ?;`);
    query.get([email], (err, tuple) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
      } else if (tuple) {
        console.log(tuple);
        res.render('user', tuple);
      } else {
        res.render('login', { error: 'User does not exist' });
      }
    });
  } else {
    res.render('login', { error: 'Please login again' });
  }
});

router.get('/logout', function (req, res, next) {
  auth.logout(req, res, next);
});
module.exports = router;
