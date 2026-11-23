const pool = require('../../db/db');

async function getResults(req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT 
        r.result_id AS id,
        st.name AS student,
        st.email AS student_email,
        sub.name AS subject,
        c.name AS class,
        tt.name AS teacher,
        r.date,
        r.type,
        r.score
      FROM results r
      LEFT JOIN students st ON st.student_id = r.student_id
      LEFT JOIN subjects sub ON sub.subject_id = r.subject_id
      LEFT JOIN classes c ON c.class_id = r.class_id
      LEFT JOIN teachers tt ON tt.teacher_id = r.teacher_id
      ORDER BY r.result_id DESC
    `);
    return res.status(200).json({ message: "Data fetched", data: rows });
  } catch (err) {
    console.error("getResults error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function createResult(req, res) {
  try {
    const { student, subject, class_name, teacher, date, type = 'exam', score } = req.body;
    if (!student || !subject || !class_name || score === undefined) {
      return res.status(400).json({ message: "Student, subject, class, and score are required" });
    }

    const [stRows] = await pool.query("SELECT student_id FROM students WHERE name = ? OR email = ?", [student, student]);
    if (!stRows.length) return res.status(404).json({ message: "Student not found" });

    const [subRows] = await pool.query("SELECT subject_id FROM subjects WHERE name = ?", [subject]);
    if (!subRows.length) return res.status(404).json({ message: "Subject not found" });

    const [cRows] = await pool.query("SELECT class_id FROM classes WHERE name = ?", [class_name]);
    if (!cRows.length) return res.status(404).json({ message: "Class not found" });

    let teacherId = null;
    if (teacher) {
      const [tRows] = await pool.query("SELECT teacher_id FROM teachers WHERE name = ? OR email = ?", [teacher, teacher]);
      if (tRows.length) teacherId = tRows[0].teacher_id;
    }

    const [result] = await pool.query(
      `INSERT INTO results (subject_id, class_id, teacher_id, student_id, date, type, score)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [subRows[0].subject_id, cRows[0].class_id, teacherId, stRows[0].student_id, date || new Date().toISOString().split('T')[0], type, Number(score)]
    );

    return res.status(201).json({ message: "Result created", data: result.insertId });
  } catch (err) {
    console.error("createResult error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function updateResult(req, res) {
  try {
    const { id, score, date, type } = req.body;
    if (!id) return res.status(400).json({ message: "Result id is required" });

    const [result] = await pool.query(
      "UPDATE results SET score = COALESCE(?, score), date = COALESCE(?, date), type = COALESCE(?, type) WHERE result_id = ?",
      [score !== undefined ? Number(score) : null, date || null, type || null, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: "Result not found" });
    return res.status(200).json({ message: "Result updated successfully" });
  } catch (err) {
    console.error("updateResult error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function deleteResult(req, res) {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: "Result id is required" });

    const [result] = await pool.query("DELETE FROM results WHERE result_id = ?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Result not found" });
    return res.status(200).json({ message: "Result deleted successfully" });
  } catch (err) {
    console.error("deleteResult error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

module.exports = {
  getResults,
  createResult,
  updateResult,
  deleteResult
};
