var fs = require('fs');
var sqlite = require('sqlite3').verbose();

sql = [
  `
  CREATE TABLE Courses (
    code TEXT PRIMARY KEY,
    title TEXT,
    program TEXT,
    level CHAR(3) CHECK(level IN ('BSc', 'MSc')),
    semester INTEGER CHECK(semester <= 4),
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
    'This course came in handy very quickly.',
    'drs. H. Philippi',
    NULL,
    'B'
  );`,
  `INSERT INTO Courses VALUES (
    'INFOBP',
    'Basic Programming',
    'Computer Science',
    'BSc',
    1,
    'A class about basic programming. It''s a beginner-level course. The coding language used is Python.',
    'dr. S.A. Sosnovsky''s Clone',
    'images/sosnovsky.jpg',
    'C'
  );`,
  `INSERT INTO Courses VALUES (
    'INFOGP',
    'Graphics',
    'Computer Science',
    'BSc',
    4,
    'A class about graphics. In this course students will have to use their mathematical capabilities in order to get good grades.',
    'dr. S.A. Sosnovsky',
    'images/sosnovsky.jpg',
    'A'
  );`,
  `INSERT INTO Courses VALUES (
    'NS-115B',
    'Quantum Mechanics',
    'Natuur- en Sterrenkunde',
    'MSc',
    2,
    'A class about Quantum Mechanics. In this course students will have no clue what they are doing',
    'dr. S.A. Sosnovsky',
    'images/sosnovsky.jpg',
    'D'
  );`,
  `INSERT INTO Courses VALUES (
    'AI-PHI',
    'Philosophy of A.I.',
    'Artificial Intelligence',
    'MSc',
    3,
    'This course will make students familiar with fundamental issues in the philosophy of AI, and will introduce them to several current discussions in the field.',
    'dr. S.A. Sosnovsky',
    'images/sosnovsky.jpg',
    'D'
  );`,
  `CREATE TABLE Students (
    sid INTEGER PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password CHAR(64) NOT NULL,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    program TEXT,
    level CHAR(3) CHECK(level IN ('BSc', 'MSc'))
  );`,
  `CREATE TABLE Registrations (
    sid INTEGER REFERENCES Students(sid),
    code TEXT REFERENCES Courses(code),
    PRIMARY KEY(sid, code)
  );`,
];

module.exports = {
  dbInit: async function (db) {
    for (const statement of sql) {
      await db.run(statement);
    }
  },
};
