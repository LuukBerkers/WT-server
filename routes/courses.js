var express = require('express');
var router = express.Router();
var auth = require('../auth');
var sqlite = require('sqlite3');

var dbFile = 'database.db';
db = new sqlite.Database(dbFile);

router.get('/all', function (req, res, next) {
  //Search:
  if (req.query.search && req.query.search.trim() !== '') {
    var term = req.query.search.trim();
    var query = db.prepare(`
      SELECT * FROM Courses
      WHERE code LIKE ?
      OR title LIKE ?
      OR program LIKE ?
      OR level LIKE ?
      OR semester = ?
      OR teacher LIKE ?
      OR timeslot = ?;
    `);
    termLike = '%' + term + '%';
    query.all(
      [termLike, termLike, termLike, term, termLike, term],
      (err, tuples) => {
        if (err) {
          console.error(err);
          res.status(500).send({ error: 'Internal server error' });
        } else if (tuples.length) {
          for (const tuple of tuples) {
            console.log('Matches: ' + tuple.code);
          }
          res.render('courses', { courses: tuples });
        } else {
          res.render('courses', { courses: [] });
        }
      }
    );
    //All items:
  } else {
    var coursesQuery = `SELECT * FROM Courses;`;
    db.all(coursesQuery, [], (err, tuples) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
      } else {
        if (!tuples.length) {
          res.render('courses', { courses: [] });
        } else {
          res.render('courses', { courses: tuples });
        }
      }
    });
  }
});

router.get('/:courseID', function (req, res, next) {
  var courseID = req.params.courseID;
  var query = db.prepare(`SELECT * FROM Courses WHERE code = ?;`);
  query.get([courseID], (err, tuple) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: 'Internal server error' });
    } else if (tuple) {
      res.render('course', tuple);
    } else {
      res.status(404).send({ error: 'Course not found' });
    }
  });
});

//Everything below this requires auth
router.use(auth.loginRequired);

router.post('/:courseID/register', async function (req, res, next) {
  var courseID = req.params.courseID;
  var email = req.session.email;
  var query = db.prepare(`SELECT sid FROM Students WHERE email = ?`);
  query.get([email], (err, value) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: 'Internal server error' });
    } else if (value) {
      addRegistration(value.sid);
    } else {
      res.status(400).send({ error: 'Bad request' });
    }
  });
  function addRegistration(sid) {
    var insertion = db.prepare(`INSERT INTO Registrations VALUES (?, ?)`);
    insertion.run([sid, courseID], function (err) {
      if (err) {
        console.error(err);
        if (err.errno === 19) {
          res.status(400).send('You are already registered for this course');
        } else {
          res.status(500).send({ error: 'Internal server error' });
        }
      } else {
        console.log(email, ' is registered for ', courseID);
        res.render('registercoursesucces');
      }
    });
  }
});

router.post('/:courseID/unregister', async function (req, res, next) {
  var courseID = req.params.courseID;
  var email = req.session.email;
  //Do some SQL here which deletes courseID of array in user entry of database
  //And await on it
  //For testing:
  res.render('unregistercoursesucces');
});
module.exports = router;
