var express = require('express');
var router = express.Router();

//This should probably come from a database:
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

router.get('/all', function(req, res, next) {
  if (users.length === 0){
    res.status(404).send({ error: "No users found" });
} else {
  res.send(users);
}
});

router.get('/:email', function(req, res, next) {
  var email = req.params.email; // Not safe, but proof of concept
  var returnUsers = [];
  users.forEach(user => {
    if (user.email === email){
      returnUsers.push(user);
    }
  })
  if (returnUsers.length === 0){
    res.status(404).send({ error: "No users found" });
} else {
  res.send(returnUsers);
}
});
module.exports = router;
