var express = require('express');
var router = express.Router();
var path = require('path');

//This should probably come from a database, but for testing:
var users = [
  {
    email: "marklooye1@gmail.com",
    first_name: "Mark",
    last_name: "Looye",
    level: "BSc",
    program: "Psychology",
    registrations: ["INFOB2WT", "Someothercourse"],
  },
  {
    email: "",
    first_name: "Luuk",
    last_name: "Bergers"
  },
  {
    email: "",
    first_name: "Thijs",
    last_name: "Rademaker"
  }
]

router.get('/', function(req, res, next) {
  var email = req.session.email; //Gets the user that is logged in atm by email
  var data;
  users.forEach(user =>{
    if (user.email === email){
      data = user;
    }
  })
  if (!data){
    res.status(404).send({ error: "No users found" });
  } else {
    //res.send(data);
    res.sendFile(path.join(__dirname+'../../public/user.html'));
  }
});

router.put('/', function(req, res, next) {
  //Route for editing profile of user
  //Make sure to use req.session.email as a path to edit for security
});
module.exports = router;
