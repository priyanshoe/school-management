const pool = require("../../db/db");

async function getClasses(req, res) {
  try {
    const [data] = await pool.query(
      "select ct.class_id, ct.name, ct.class_teacher as class_teacher_id, tt.name as class_teacher from classes ct left join teachers tt on tt.teacher_id = ct.class_teacher",
    );
    return res.status(200).json({ message: "Data fetched", data: data });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error in data fetching", error: err.message });
  }
}

async function createClass(req, res) {
  try {
    const { name, class_teacher } = req.body;
    if (!name || !String(name).trim()) return res.status(400).json({ message: "Class name is required" });

    if (class_teacher) {
      const [checkTeacher] = await pool.query(
        "select teacher_id from teachers where teacher_id=?",
        class_teacher,
      );
      if (checkTeacher.length === 0)
        return res.status(409).json({ message: "Teacher not found" });
      const [checkTeacher2] = await pool.query(
        "select class_teacher from classes where class_teacher=?",
        class_teacher,
      );
      if (checkTeacher2.length > 0)
        return res.status(409).json({ message: "Teacher already added" });
      const [checkClass] = await pool.query(
        "select * from classes where name = ?",
        [name],
      );
      if (checkClass.length > 0)
        return res.status(409).json({ message: "Class already exist" });
      const [result] = await pool.query(
        "insert into classes (name,class_teacher) values (?,?)",
        [name, class_teacher],
      );
      if (result.affectedRows === 0)
        return res.status(409).json({ message: "Class not saved" });
    } else {
      const [check] = await pool.query("select * from classes where name = ?", [
        name,
      ]);
      if (check.length > 0)
        return res.status(409).json({ message: "Class already exist" });
      const [result] = await pool.query(
        "insert into classes (name) values (?)",
        [name],
      );
      if (result.affectedRows === 0)
        return res.status(409).json({ message: "Class not saved" });
    }

    return res.status(201).json({ message: "Class saved" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
}

async function updateClass(req, res) {
  try {
    const { class_id, name, class_teacher } = req.body;
    if (!class_id || !name) return res.status(400).json({ message: "Class id and name are required" });
    const [current] = await pool.query("select class_id from classes where class_id = ?", [class_id]);
    if (current.length === 0) return res.status(404).json({ message: "Class not found" });
    const [check] = await pool.query(
      "select class_id from classes where class_teacher = ? and class_id <> ?",
      [class_teacher, class_id],
    );
    if (check.length > 0) {
      return res.status(409).json({ message: "Teacher already equiped" });
    }
    const [result] = await pool.query(
      "update classes set name=?, class_teacher=? where class_id=?",
      [name, class_teacher || null, class_id],
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Class not found" });
    }
    return res.status(200).json({ message: "Class saved" });
  } catch (err) {
   return res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function deleteClass(req, res) {
  try {
    const { id, name } = req.body;
    const [result] = await pool.query(
      "delete from classes where class_id=? and name=?",
      [id, name],
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Class not found" });
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getClasses,
  createClass,
  deleteClass,
  updateClass,
};
