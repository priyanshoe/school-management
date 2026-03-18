const pool = require("../../db/db");

async function getSubjects(req, res) {
  try {
    const [data] = await pool.query(
      "select s.*, group_concat(t.name) as teachers from subjects s left join subjects_teachers st on s.subject_id = st.subject_id left join teachers t on t.teacher_id = st.teacher_id  group by s.subject_id",
    );
    if (data.length === 0)
      return res.status(409).json({ message: "Data not found" });
    return res.status(200).json({ message: "Data fetched", data: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function createSubject(req, res) {
  try {
    const subjectName = req.body;
    const [result] = await pool.query("select * from subjects where name = ?", [
      subjectName,
    ]);
    if (result.length > 0)
      return res.status(409).json({ message: "Subject already added" });
    const [data] = await pool.query("INSERT INTO subjects (name) VALUE (?)", [
      subjectName,
    ]);
    if (data.affectedRows === 0)
      return res.status(409).json({ message: "Subject not added" });
    return res.status(200).json({ message: "Subject added" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function updateSubject(req, res) {
  try {
    const { id, name } = req.body;
    const [result] = await pool.query(
      "update subjects set name=? where subject_id=?",
      [name, id],
    );
    if (result.affectedRows === 0)
      return res.status(409).json({ message: "Subject not update" });
    return res.status(200).json({ message: "Subject update" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function deleteSubject(req, res) {
  try {
    const { id, name } = req.body;
    const [result] = await pool.query(
      "delete from subjects where subject_id=? and name=?",
      [id, name],
    );
    if (result.affectedRows === 0)
      return res.status(409).json({ message: "Subject not deleted" });
    return res.status(200).json({ message: "Subject deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
};
