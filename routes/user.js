var express = require('express');
var router = express.Router();
var auth = require('../auth');


router.get('/', function(req, res, next) {
  var email = req.session.email; //Gets the user that is logged in atm by email
  if (email){
    var query = db.prepare(`SELECT * FROM Students WHERE email = ?;`);
		query.get([email], (err, tuple) => {
			if(err){
				console.error(err);
				res.status(500).send({ error: 'Internal server error' });
			} else if (tuple){
        console.log(tuple);
        res.render("user", tuple);
			} else {
				res.render("login", {error: 'User does not exist'});
			}
		});
	} else {
		res.render("login", {error: 'Please login again'});
	}
});

router.put('/', function(req, res, next) {
  //Route for editing profile of user
  //Make sure to use req.session.email as a path to edit for security
});

router.get('/logout', function(req, res, next) {
  auth.logout(req,res,next);
});
module.exports = router;
