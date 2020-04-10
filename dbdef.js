var fs = require('fs');
var sqlite = require('sqlite3').verbose();

sql = [
  `
  CREATE TABLE Courses (
    code TEXT PRIMARY KEY,
    title TEXT,
    program TEXT,
    level TEXT,
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
    'S.A. Sosnovsky',
    'public/images/sosnovsky.jpg',
    'D'
  );`,
];

module.exports = {
  dbInit: async function (db) {
    for (const statement of sql) {
      await db.run(statement);
    }
  },
};
