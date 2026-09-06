const pool = require("../../db/db");

async function getSubjects(req, res) {
  try {
    const [data] = await pool.query(
      "select s.*, group_concat(t.name) as teachers from subjects s left join subjects_teachers st on s.subject_id = st.subject_id left join teachers t on t.teacher_id = st.teacher_id  group by s.subject_id",
    );
    return res.status(200).json({ message: "Data fetched", data: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function createSubject(req, res) {
  try {
    // The current form sends [name]; accepting name as well makes the API
    // usable by normal JSON clients without changing that frontend contract.
    const subjectName = Array.isArray(req.body) ? req.body[0] : req.body.name;
    if (!subjectName || !String(subjectName).trim()) {
      return res.status(400).json({ message: "Subject name is required" });
    }
    const name = String(subjectName).trim();
    const [result] = await pool.query("select * from subjects where name = ?", [
      name,
    ]);
    if (result.length > 0)
      return res.status(409).json({ message: "Subject already added" });
    const [data] = await pool.query("INSERT INTO subjects (name) VALUE (?)", [
      name,
    ]);
    if (data.affectedRows === 0)
      return res.status(409).json({ message: "Subject not added" });
    return res.status(201).json({ message: "Subject added", data: data.insertId });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function updateSubject(req, res) {
  try {
    const { id, name } = req.body;
    if (!id || !name || !String(name).trim()) return res.status(400).json({ message: "Id and name are required" });
    const [result] = await pool.query(
      "update subjects set name=? where subject_id=?",
      [name, id],
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Subject not found" });
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
      return res.status(404).json({ message: "Subject not found" });
    return res.status(204).send();
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
