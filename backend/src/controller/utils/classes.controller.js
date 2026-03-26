const pool = require("../../db/db");

async function getClasses(req, res) {
  try {
    const [data] = await pool.query("select * from classes");
    if (data.length === 0)
      return res.status(409).json({ message: "Data not found" });
    return res.status(200).json({ message: "Data fetched", data: data });
  } catch (err) {
    return res.status(500).json({ message: "Error in data fetching", error: err.message });
  }
}

async function createClass(req, res) {
  try {
    const name = req.body;
    const [check] = await pool.query("select * from classes where name = ?", [name])
    if (check.length > 0) return res.status(409).json({ message: "Class already exist" })
    const [result] = await pool.query('insert into classes (name) values (?)', [name])
    if (result.affectedRows === 0) return res.status(409).json({ message: "Class not saved" })
    return res.status(200).json({ message: "Class saved" })

  } catch (err) {
    return console.log(err);

    res.status(500).json({ message: "Server error", error: err.message });
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
      return res.status(409).json({ message: "Class not deleted" });
    return res.status(200).json({ message: "Class deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}


module.exports = {
  getClasses,
  createClass,
  deleteClass
};
