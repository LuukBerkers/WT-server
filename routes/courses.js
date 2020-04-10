var express = require('express');
var router = express.Router();
var auth = require('../auth');
var sqlite = require('sqlite3');

var dbFile = 'database.db';
db = new sqlite.Database(dbFile);

router.get('/all', async function (req, res, next) {
  var coursesQuery = `SELECT * FROM Courses;`;
  db.all(coursesQuery, [], (err, tuples) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: 'Internal server error' });
    } else {
      if (tuples.length === 0) {
        res.status(404).send({ error: 'No courses found' });
      } else {
        console.log(tuples);
        res.render('courses', tuples);
      }
    }
  });
});

router.get('/search/:term', function (req, res, next) {
  var term = req.params.term;
  var data = [];
  courses.forEach((course) => {
    if (
      course.code === term ||
      course.title === term ||
      course.program === term ||
      course.level === term ||
      course.semester === term ||
      course.teacher === term ||
      course.timeslot === term
    ) {
      data.push(course);
    }
  });
  if (data.length === 0) {
    res.status(404).send({ error: 'No courses found' });
  } else {
    res.render('courses', data);
  }
});

router.get('/:courseID', function (req, res, next) {
  var courseID = req.params.courseID;
  var data = [];
  courses.forEach((course) => {
    if (course.id === courseID) {
      data.push(course);
    }
  });
  if (data.length === 0) {
    res.status(404).send({ error: 'No courses found' });
  } else {
    res.render('course', data);
  }
});

//Everything below this requires auth
router.use(auth.loginRequired);

router.put('/:courseID/register', async function (req, res, next) {
  var courseID = req.params.courseID;
  var email = req.session.email;
  //Do some SQL here which adds courseID to array in user entry of database
  //And await on it
  //Also check if user has right qualifications in the database for the course
  //For testing:
  console.log(email, ' is registered for ', courseID);
  res.render('registercoursesucces');
});

router.delete('/:courseID/unregister', async function (req, res, next) {
  var courseID = req.params.courseID;
  var email = req.session.email;
  //Do some SQL here which deletes courseID of array in user entry of database
  //And await on it
  //For testing:
  res.render('unregistercoursesucces');
});
module.exports = router;
