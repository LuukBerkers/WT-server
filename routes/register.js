var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var path = require('path');

router.get('/', function(req, res, next) {
  if (!req.session.loggedin){
    res.sendFile(path.join(__dirname+'../../public/register.html'));
  } else {
    res.redirect('/login/succes');
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
        res.redirect('register/succes');
    } else {
        res.status(500).send('Something went wrong');
    }			
});

router.get('/succes', function(req, res, next) {
    res.sendFile(path.join(__dirname+'../../public/registersucces.html'));
});

module.exports = router;
