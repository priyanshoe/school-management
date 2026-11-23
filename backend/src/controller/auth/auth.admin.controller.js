const pool = require('../../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getJwtSecret = () => process.env.JWT_SECRET || process.env.JWT_SECRETE || 'SECRET';

async function signUpAdmin(req, res) {
  try {
    const { name, email, phone, password, adminKey } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    // Protect admin registration: require secret adminKey or existing admin session
    const expectedKey = process.env.ADMIN_SECRET_KEY || 'adminsecret123';
    const isCallerAdmin = req.user && req.user.role === 'admin';
    if (!isCallerAdmin && adminKey !== expectedKey) {
      return res.status(403).json({
        message: "Admin registration is restricted. A valid admin key is required."
      });
    }

    const [existing] = await pool.query("SELECT email FROM admins WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: "Admin already exists with this email" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      "INSERT INTO admins (name, email, phone, password) VALUES (?, ?, ?, ?)",
      [name, email, phone || null, hashPassword]
    );

    const token = jwt.sign(
      { id: result.insertId, role: 'admin', name, email },
      getJwtSecret(),
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/'
    });

    return res.status(201).json({
      message: "Admin registered successfully",
      data: { id: result.insertId, role: 'admin', name, email }
    });
  } catch (error) {
    console.error("signUpAdmin error:", error);
    return res.status(500).json({ message: "Admin registration failed", error: error.message });
  }
}

async function signInAdmin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const [user] = await pool.query(
      "SELECT admin_id AS id, name, email, password, 'admin' AS role FROM admins WHERE email = ?",
      [email]
    );
    if (user.length === 0) {
      return res.status(401).json({ message: "Wrong credentials" });
    }

    const match = await bcrypt.compare(password, user[0].password);
    if (!match) {
      return res.status(401).json({ message: "Wrong credentials" });
    }

    delete user[0].password;
    const token = jwt.sign(
      { id: user[0].id, role: user[0].role, name: user[0].name, email: user[0].email },
      getJwtSecret(),
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/'
    });

    return res.status(200).json({ message: "LogIn Success", data: user[0] });
  } catch (err) {
    console.error("signInAdmin error:", err);
    return res.status(500).json({ message: "SignIn failed", error: err.message });
  }
}

async function signOutAdmin(req, res) {
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

module.exports = {
  signUpAdmin,
  signInAdmin,
  signOutAdmin
};
