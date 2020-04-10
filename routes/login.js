var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var auth = require('../auth');

//Ik weet niet echt hoe al deze SQL shit werkt, maar dit is gevolgd uit tutorial: https://codeshack.io/basic-login-system-nodejs-express-mysql/
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'login'
});

router.get('/', function(req, res, next) {
  if (!req.session.loggedin){
	  if(req.session.error){
		var error = req.session.error;
		req.session.error = undefined;
		res.render("login", {error: error});
		
	  } else {
		res.render("login", {error: ""});
	  }
  } else {
    res.redirect('user');
  }
});

router.post('/', function(req, res) {
	var email = req.body.email;
	var password = req.body.password;
	if (email && password) {
		//connection.query('SELECT * FROM accounts WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
    //Or some other fancy SQL
    //For testing:
    var results = [];
    results.length = 1;
    //
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.email = email;
				res.redirect('user');
			} else {
				res.send('Incorrect Email and/or Password!');
			}			
		//});
	} else {
		res.send('Please enter Email and Password!'); //Shouldn't happen because of required fields, but ya never know
	}
});
module.exports = router;
