var express = require('express');
var router = express.Router();

//This should probably come from a database:
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
    timeslot: "D"
  },
]

router.get('/all', function(req, res, next) {
  res.send(courses);
});

router.get('/:courseID', function(req, res, next) {
  var courseID = req.params.courseID; // Not safe, but proof of concept
  var returnCourses = [];
  courses.forEach(course => {
    if (course.id === courseID){
      returnCourses.push(course);
    }
  })
  res.send(returnCourses);
});
module.exports = router;
