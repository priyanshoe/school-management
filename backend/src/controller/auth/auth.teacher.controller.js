const pool = require('../../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getJwtSecret = () => process.env.JWT_SECRET || process.env.JWT_SECRETE || 'SECRET';

async function signUpTeacher(req, res) {
    try {
        const { name, email, photo, phone, address, dob, blood_group, bio, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are required" });
        }
        const [user] = await pool.query("SELECT email FROM teachers WHERE email = ?", [email]);
        if (user.length > 0) return res.status(409).json({ message: "Teacher already exists" });

        const hashPassword = await bcrypt.hash(password, 10);
        const [created] = await pool.query(
            "INSERT INTO teachers (name, email, photo, phone, address, dob, blood_group, bio, password) VALUES (?,?,?,?,?,?,?,?,?)",
            [name, email, photo || null, phone || null, address || null, dob || null, blood_group || null, bio || null, hashPassword]
        );

        const jwtkey = getJwtSecret();
        const token = jwt.sign({ id: created.insertId, role: 'teacher', name, email }, jwtkey, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/'
        });
        return res.status(201).json({ message: "Teacher registered successfully", data: created.insertId });
    } catch (error) {
        console.error("signUpTeacher error:", error);
        return res.status(500).json({ message: "Registration failed", error: error.message });
    }
}

async function signInTeacher(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

        let [user] = await pool.query("SELECT teacher_id AS id, name, email, photo, password, 'teacher' AS role FROM teachers WHERE email = ?", [email]);
        if (user.length === 0) return res.status(401).json({ message: "Wrong Credential" });
        const hashPassword = await bcrypt.compare(password, user[0].password);
        if (!hashPassword) return res.status(401).json({ message: "Wrong Credential" });
        delete user[0].password;

        const jwtkey = getJwtSecret();
        const token = jwt.sign({ id: user[0].id, role: user[0].role, name: user[0].name, email: user[0].email }, jwtkey, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/'
        });
        return res.status(200).json({ message: "LogIn Success", data: user[0] });
    } catch (err) {
        console.error("signInTeacher error:", err);
        return res.status(500).json({ message: "SignIn failed", error: err.message });
    }
}

async function signOutTeacher(req, res) {
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
    signUpTeacher,
    signInTeacher,
    signOutTeacher
};
