var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var user = {
    first_name: "Mark",
    last_name: "Looye",
    age: "23",

  }
  res.send(user);
});

module.exports = router;
