const pool = require('../../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getJwtSecret = () => process.env.JWT_SECRET || process.env.JWT_SECRETE || 'SECRET';

async function unifiedSignIn(req, res) {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const rolesToSearch = role
      ? [role.toLowerCase()]
      : ['admin', 'teacher', 'student', 'parent'];

    for (const r of rolesToSearch) {
      let query = '';
      if (r === 'admin') {
        query = "SELECT admin_id AS id, name, email, password, 'admin' AS role FROM admins WHERE email = ?";
      } else if (r === 'teacher') {
        query = "SELECT teacher_id AS id, name, email, photo, password, 'teacher' AS role FROM teachers WHERE email = ?";
      } else if (r === 'student') {
        query = "SELECT student_id AS id, name, email, photo, password, 'student' AS role FROM students WHERE email = ?";
      } else if (r === 'parent') {
        query = "SELECT parent_id AS id, name, email, password, 'parent' AS role FROM parents WHERE email = ?";
      }

      if (!query) continue;

      const [users] = await pool.query(query, [email]);
      if (users.length > 0) {
        const user = users[0];
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          delete user.password;
          const token = jwt.sign(
            { id: user.id, role: user.role, name: user.name, email: user.email },
            getJwtSecret(),
            { expiresIn: '7d' }
          );

          res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/'
          });

          return res.status(200).json({
            message: "LogIn Success",
            data: user
          });
        }
      }
    }

    return res.status(401).json({ message: "Invalid email or password" });
  } catch (err) {
    console.error("unifiedSignIn error:", err);
    return res.status(500).json({ message: "SignIn failed", error: err.message });
  }
}

async function unifiedSignOut(req, res) {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/'
    });
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    return res.status(500).json({ message: "Logout failed" });
  }
}

async function getSession(req, res) {
  try {
    const { id, role } = req.user;
    let userDetails = null;

    if (role === 'admin') {
      const [rows] = await pool.query("SELECT admin_id AS id, name, email, phone, 'admin' AS role FROM admins WHERE admin_id = ?", [id]);
      if (rows.length) userDetails = rows[0];
    } else if (role === 'teacher') {
      const [rows] = await pool.query("SELECT teacher_id AS id, name, email, photo, phone, address, bio, blood_group, dob, 'teacher' AS role FROM teachers WHERE teacher_id = ?", [id]);
      if (rows.length) userDetails = rows[0];
    } else if (role === 'student') {
      const [rows] = await pool.query("SELECT s.student_id AS id, s.name, s.email, s.photo, s.phone, s.address, s.bio, s.blood_group, s.dob, c.name AS class_name, 'student' AS role FROM students s LEFT JOIN classes c ON c.class_id = s.class_id WHERE s.student_id = ?", [id]);
      if (rows.length) userDetails = rows[0];
    } else if (role === 'parent') {
      const [rows] = await pool.query("SELECT parent_id AS id, name, email, phone, address, blood_group, dob, 'parent' AS role FROM parents WHERE parent_id = ?", [id]);
      if (rows.length) userDetails = rows[0];
    }

    if (!userDetails) {
      userDetails = { id, role, email: req.user.email, name: req.user.name };
    }

    return res.status(200).json({ message: 'Session active', data: userDetails });
  } catch (err) {
    console.error("getSession error:", err);
    return res.status(500).json({ message: "Failed to fetch session", error: err.message });
  }
}

module.exports = {
  unifiedSignIn,
  unifiedSignOut,
  getSession
};
