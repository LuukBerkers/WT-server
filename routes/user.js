var express = require('express');
var router = express.Router();

//This should probably come from a database, but for testing:
var users = [
  {
    email: "marklooye1@gmail.com",
    first_name: "Mark",
    last_name: "Looye"
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
//Testing route, should not be in production:
router.get('/all', function(req, res, next) {
  if (users.length === 0){
    res.status(404).send({ error: "No users found" });
  } else {
    res.send(users);
  }
});

router.get('/', function(req, res, next) {
  if (req.session.loggedin){       //Only for loggedinusers
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
      res.send(data);
    }
  } else {
    res.redirect('login')
  }
});
module.exports = router;
