var express = require('express');
var router = express.Router();

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
    var term = req.params.term; // Not safe, but proof of concept
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
  var courseID = req.params.courseID; // Not safe, but proof of concept
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
module.exports = router;
