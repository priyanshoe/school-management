const pool = require('../../db/db');

async function getStats(req, res) {
  try {
    const [[adminCount]] = await pool.query("SELECT COUNT(*) AS total FROM admins");
    const [[teacherCount]] = await pool.query("SELECT COUNT(*) AS total FROM teachers");
    const [[studentCount]] = await pool.query("SELECT COUNT(*) AS total FROM students");
    const [[parentCount]] = await pool.query("SELECT COUNT(*) AS total FROM parents");
    const [[classCount]] = await pool.query("SELECT COUNT(*) AS total FROM classes");
    const [[subjectCount]] = await pool.query("SELECT COUNT(*) AS total FROM subjects");
    const [[lessonCount]] = await pool.query("SELECT COUNT(*) AS total FROM lessons");
    const [[examCount]] = await pool.query("SELECT COUNT(*) AS total FROM examData");
    const [[assignmentCount]] = await pool.query("SELECT COUNT(*) AS total FROM assignmentData");

    const today = new Date().toLocaleDateString("en-GB");
    const totalCount = [
      { date: today, total: adminCount.total, role: "admin" },
      { date: today, total: teacherCount.total, role: "teachers" },
      { date: today, total: studentCount.total, role: "students" },
      { date: today, total: parentCount.total, role: "parents" },
    ];

    return res.status(200).json({
      message: "Stats fetched successfully",
      data: {
        totalCount,
        counts: {
          admins: adminCount.total,
          teachers: teacherCount.total,
          students: studentCount.total,
          parents: parentCount.total,
          classes: classCount.total,
          subjects: subjectCount.total,
          lessons: lessonCount.total,
          exams: examCount.total,
          assignments: assignmentCount.total
        }
      }
    });
  } catch (err) {
    console.error("getStats error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

module.exports = { getStats };
