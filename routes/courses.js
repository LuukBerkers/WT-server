var express = require('express');
var router = express.Router();
var auth = require('../auth');

//This should probably come from a database, but for testing:
var courses = [
  {
    id: "9384",
    name: "Webtech",
    timeslot: "A"
  },
  {
    id: "8123",
    name: "Databases",
    timeslot: "C"
  },
  {
    id: "0198",
    name: "Tekenen voor gevorderden",
    timeslot: "C"
  },
]

router.get('/all', function(req, res, next) {
    if (courses.length === 0){
        res.status(404).send({ error: "No courses found" });
    } else {
      res.send(courses);
    }
});

router.get('/search/:term', function(req, res, next) {
    var term = req.params.term;
    var data = [];
    courses.forEach(course => {
      if (course.id === term || course.name ===  term || course.timeslot === term){
        data.push(course);
      }
    })
    if (data.length === 0){
        res.status(404).send({ error: "No courses found" });
    } else {
      res.send(data);
    }
  });

router.get('/:courseID', function(req, res, next) {
  var courseID = req.params.courseID;
  var data = [];
  courses.forEach(course => {
    if (course.id === courseID){
      data.push(course);
    }
  })
  if (data.length === 0){
      res.status(404).send({ error: "No courses found" });
  } else {
    res.send(data);
  }
});

//Everything below this requires auth
router.use(auth.loginRequired);

router.put('/:courseID/register', async function(req, res, next) {
  var courseID = req.params.courseID;
  var email = req.session.email;
  //Do some SQL here which adds courseID to array in user entry of database
  //And await on it
  //Also check if user has right qualifications in the database for the course
  //For testing:
  console.log(email, ' is registered for ', courseID);
  res.status(204).send();
});

router.delete('/:courseID/unregister', async function(req, res, next) {
  var courseID = req.params.courseID;
  var email = req.session.email;
  //Do some SQL here which deletes courseID of array in user entry of database
  //And await on it
  //For testing:
  console.log(email, ' is unregistered for ', courseID);
  res.status(204).send();
});
module.exports = router;
