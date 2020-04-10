var fs = require('fs');
var sqlite = require('sqlite3').verbose();

sql = [
  `
  CREATE TABLE Courses (
    code TEXT PRIMARY KEY,
    title TEXT,
    program TEXT,
    level CHAR(3) CHECK(level IN ('BSc', 'MSc')),
    semester INT CHECK(semester <= 4),
    description TEXT,
    teacher TEXT,
    photo TEXT,
    timeslot CHAR(1) CHECK(timeslot IN ('A', 'B', 'C', 'D'))
  );`,
  `
  INSERT INTO Courses VALUES (
    'INFOB2WT',
    'Web technology',
    'Computer Science',
    'BSc',
    3,
    'A class about web technology, which has a test that is way to long',
    'dr. S.A. Sosnovsky',
    'images/sosnovsky.jpg',
    'D'
  );`,
  `
  INSERT INTO Courses VALUES (
    'INFODB',
    'Databases',
    'Computer Science',
    'BSc',
    3,
    NULL,
    'drs. H. Philippi',
    NULL,
    'B'
  );`,
  `CREATE TABLE Students (
    id INT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password CHAR(64) NOT NULL,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    program TEXT,
    level CHAR(3) CHECK(level IN ('BSc', 'MSc'))
  );`,
];

module.exports = {
  dbInit: async function (db) {
    for (const statement of sql) {
      await db.run(statement);
    }
  },
};
