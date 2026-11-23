const pool = require('../../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getJwtSecret = () => process.env.JWT_SECRET || process.env.JWT_SECRETE || 'SECRET';

async function signUpStudent(req, res) {
    try {
        const { name, email, photo, phone, class_name, address, dob, blood_group, bio, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required" });
        const [user] = await pool.query("SELECT email FROM students WHERE email = ?", [email]);
        if (user.length > 0) return res.status(409).json({ message: "Student already exists" });
        const hashPassword = await bcrypt.hash(password, 10);

        let classId = null;
        if (class_name) {
            const [classes] = await pool.query("SELECT class_id FROM classes WHERE name = ?", [class_name]);
            if (!classes.length) return res.status(404).json({ message: "Class not found" });
            classId = classes[0].class_id;
        }
        const [created] = await pool.query(
            "INSERT INTO students (name, email, photo, phone, class_id, address, dob, blood_group, bio, password) VALUES (?,?,?,?,?,?,?,?,?,?)",
            [name, email, photo || null, phone || null, classId, address || null, dob || null, blood_group || null, bio || null, hashPassword]
        );
        const jwtkey = getJwtSecret();
        const token = jwt.sign({ id: created.insertId, role: 'student', name, email }, jwtkey, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/'
        });
        return res.status(201).json({ message: "SignUp Success", data: created.insertId });
    } catch (err) {
        console.error("signUpStudent error:", err);
        return res.status(500).json({ message: "SignUp failed", error: err.message });
    }
}

async function signInStudent(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Email and password are required" });
        let [user] = await pool.query("SELECT student_id AS id, name, email, photo, password, 'student' AS role FROM students WHERE email = ?", [email]);
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
        console.error("signInStudent error:", err);
        return res.status(500).json({ message: "SignIn failed", error: err.message });
    }
}

async function signOutStudent(req, res) {
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
    signUpStudent,
    signInStudent,
    signOutStudent
};
