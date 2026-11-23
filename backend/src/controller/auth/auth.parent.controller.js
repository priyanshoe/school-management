const db = require('../../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getJwtSecret = () => process.env.JWT_SECRET || process.env.JWT_SECRETE || 'SECRET';

async function signUpParent(req, res) {
    try {
        const parentData = req.body.parentData || req.body;
        const { name, email, phone, address, dob, blood_group, password, studentEmail, student_email = [] } = parentData;
        if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required" });

        const checkParent = 'SELECT email FROM parents WHERE email = ?';
        const [user] = await db.query(checkParent, [email]);
        if (user.length > 0) return res.status(409).json({ message: "User already exists" });

        const hash = await bcrypt.hash(password, 10);
        const insertParent = 'INSERT INTO parents (name, email, phone, address, dob, blood_group, password) VALUES (?,?,?,?,?,?,?)';
        const [inserted] = await db.query(insertParent, [name, email, phone || null, address || null, dob || null, blood_group || null, hash]);

        // Link student emails if provided
        const emailsToLink = [...(student_email || [])];
        if (studentEmail && !emailsToLink.includes(studentEmail)) {
            emailsToLink.push(studentEmail);
        }

        for (const sEmail of emailsToLink) {
            const [sRow] = await db.query("SELECT student_id FROM students WHERE email = ?", [sEmail.trim()]);
            if (sRow.length > 0) {
                await db.query("INSERT IGNORE INTO parents_students (parent_id, student_id) VALUES (?, ?)", [inserted.insertId, sRow[0].student_id]);
            }
        }

        const jwtkey = getJwtSecret();
        const token = jwt.sign({ id: inserted.insertId, role: "parent", name, email }, jwtkey, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/'
        });
        return res.status(201).json({ message: "SignUp success", data: { id: inserted.insertId, role: 'parent', name, email } });
    } catch (err) {
        console.error("signUpParent error:", err);
        return res.status(500).json({ message: "SignUp failed", error: err.message });
    }
}

async function signInParent(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

        const checkUser = 'SELECT parent_id AS id, name, email, password, "parent" AS role FROM parents WHERE email = ?';
        const [user] = await db.query(checkUser, [email]);
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
        console.error("signInParent error:", err);
        return res.status(500).json({ message: "SignIn failed", error: err.message });
    }
}

async function signOutParent(req, res) {
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
    signUpParent,
    signInParent,
    signOutParent
};
