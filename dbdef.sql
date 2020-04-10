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
);
