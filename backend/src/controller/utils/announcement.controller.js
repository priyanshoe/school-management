const pool = require('../../db/db');

async function getAnnouncements(req, res) {
  try {
    const [rows] = await pool.query("SELECT announcement_id AS id, title, `desc`, class_name AS class, date, time, priority FROM announcements ORDER BY date DESC");
    return res.status(200).json({ message: "Announcements fetched", data: rows });
  } catch (err) {
    console.error("getAnnouncements error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function createAnnouncement(req, res) {
  try {
    const { title, desc, class_name, date, time, priority } = req.body;
    if (!title || !date) {
      return res.status(400).json({ message: "Title and date are required" });
    }

    const [result] = await pool.query(
      "INSERT INTO announcements (title, `desc`, class_name, date, time, priority) VALUES (?, ?, ?, ?, ?, ?)",
      [title, desc || '', class_name || 'All Classes', date, time || 'All Day', priority || 'medium']
    );

    return res.status(201).json({ message: "Announcement created successfully", data: result.insertId });
  } catch (err) {
    console.error("createAnnouncement error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function updateAnnouncement(req, res) {
  try {
    const { id, title, desc, class_name, date, time, priority } = req.body;
    if (!id || !title) {
      return res.status(400).json({ message: "Announcement id and title are required" });
    }

    const [result] = await pool.query(
      "UPDATE announcements SET title=?, `desc`=?, class_name=?, date=?, time=?, priority=? WHERE announcement_id=?",
      [title, desc || '', class_name || 'All Classes', date, time || 'All Day', priority || 'medium', id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: "Announcement not found" });
    return res.status(200).json({ message: "Announcement updated successfully" });
  } catch (err) {
    console.error("updateAnnouncement error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function deleteAnnouncement(req, res) {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: "Announcement id is required" });

    const [result] = await pool.query("DELETE FROM announcements WHERE announcement_id = ?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Announcement not found" });
    return res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (err) {
    console.error("deleteAnnouncement error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

module.exports = {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
};
