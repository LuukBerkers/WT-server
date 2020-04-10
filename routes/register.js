var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/', function(req, res, next) {
  if (!req.session.loggedin){
    res.render("register");
  } else {
    res.redirect('user');
  }
});

router.post('/', function(req, res) {
    var student;
    try {
        student = {
            email : req.body.email,
            password : req.body.password,
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            program : req.body.program,
            academic_level : req.body.academic_level
        }
    } catch (e){
        res.status(400).send();
        throw(e);
    }
    //Some sql to put student in database
    //For testing:
    var someSQLReturn = true;
    if (someSQLReturn) {
        res.redirect('user');
    } else {
        res.status(500).send('Something went wrong');
    }			
});

router.get('/succes', function(req, res, next) {
    res.render("registerusersucces");
});

module.exports = router;
