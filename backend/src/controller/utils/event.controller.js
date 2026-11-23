const pool = require('../../db/db');

async function getEvents(req, res) {
  try {
    const [rows] = await pool.query("SELECT event_id AS id, title, `desc`, class_name AS class, date, startTime, endTime FROM events ORDER BY date ASC");
    return res.status(200).json({ message: "Events fetched", data: rows });
  } catch (err) {
    console.error("getEvents error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function createEvent(req, res) {
  try {
    const { title, desc, class_name, date, startTime, endTime } = req.body;
    if (!title || !date) {
      return res.status(400).json({ message: "Title and date are required" });
    }

    const [result] = await pool.query(
      "INSERT INTO events (title, `desc`, class_name, date, startTime, endTime) VALUES (?, ?, ?, ?, ?, ?)",
      [title, desc || '', class_name || 'All Classes', date, startTime || '10:00', endTime || '11:00']
    );

    return res.status(201).json({ message: "Event created successfully", data: result.insertId });
  } catch (err) {
    console.error("createEvent error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function updateEvent(req, res) {
  try {
    const { id, title, desc, class_name, date, startTime, endTime } = req.body;
    if (!id || !title) {
      return res.status(400).json({ message: "Event id and title are required" });
    }

    const [result] = await pool.query(
      "UPDATE events SET title=?, `desc`=?, class_name=?, date=?, startTime=?, endTime=? WHERE event_id=?",
      [title, desc || '', class_name || 'All Classes', date, startTime || '10:00', endTime || '11:00', id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: "Event not found" });
    return res.status(200).json({ message: "Event updated successfully" });
  } catch (err) {
    console.error("updateEvent error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function deleteEvent(req, res) {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: "Event id is required" });

    const [result] = await pool.query("DELETE FROM events WHERE event_id = ?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Event not found" });
    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("deleteEvent error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
};
