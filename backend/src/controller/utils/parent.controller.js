const db = require('../../db/db')
const bcrypt = require('bcrypt')


async function getParents(req, res) {
    try {
        const [users] = await db.query('SELECT pt.*, GROUP_CONCAT(st.name)  AS student_names, GROUP_CONCAT(st.email) AS student_emails FROM parents pt LEFT JOIN parents_students ps ON pt.parent_id = ps.parent_id LEFT JOIN students st ON st.student_id = ps.student_id GROUP BY pt.parent_id')
        return res.status(200).json({ message: "Data fetched success", data: users })
    } catch (err) {
        return res.status(500).json({ message: "Data not found", error: err })
    }
}

async function getParent(req, res) {
    try {
        const { id } = req.body;
        const [user] = await db.query('SELECT * FROM parents WHERE parent_id = ?', [id]);
        return res.status(200).json({ message: "Data fetched success", data: user })
    } catch (err) {
        return res.status(500).json({ message: "Data not found", error: err })
    }
}


async function createParent(req, res) {
    const connection = await db.getConnection();
    try {
        const { name, email, student_email, phone, address, dob, blood_group, password } = req.body;
        const [user] = await connection.query('SELECT email FROM parents WHERE email = ?', [email]);
        if (user.length > 0) return res.status(409).json({ message: "Parent alreay exist" })
        const hash = await bcrypt.hash(password, 10);
        await connection.beginTransaction();
        const [inserted] = await connection.query('INSERT INTO parents (name,email,phone,address,dob,blood_group,password) VALUES (?,?,?,?,?,?,?)',
            [name, email, phone, address, dob, blood_group, hash])
        for (const item of student_email) {
            const [student_id] = await connection.query('SELECT student_id FROM students WHERE email = ?', [item])
            if (student_id.length === 0) throw new Error(`Student not found ${item}`)
            const [result] = await connection.query('INSERT INTO parents_students (parent_id, student_id) VALUES (?,?)', [inserted.insertId, student_id[0].student_id])
            if (result.affectedRows === 0) throw new Error("Student not added")
        }
        await connection.commit();
        return res.status(200).json({ message: "Parent added", id: inserted.insertId })
    } catch (error) {
        await connection.rollback();
        return res.status(500).json({ message: error.message || "Creation failed"})
    } finally {
        connection.release();
    }
}


async function updateParent(req, res) {
    try {
        const { name, email, phone, address, dob, blood_group, parent_id } = req.body;
        const [result] = await db.query('UPDATE parents SET name=?, email=?, phone=?, address=?, dob=?, blood_group=? WHERE parent_id = ?',
            [name, email, phone, address, dob, blood_group, parent_id])
        if (result.affectedRows === 0) res.status(404).json({ message: "Parent not found" });
        return res.status(200).json({ message: "Parent Update success" })
    } catch (err) {
        return res.status(500).json({ message: "Parent Update failed", error: err })
    }
}


async function deleteParent(req, res) {
    try {
        const { email } = req.body;
        await db.query("DELETE FROM parents WHERE email = ?", [email])
        return res.status(200).json({ message: "Data delete" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Teacher deletion failed", error: err });
    }
}

module.exports = {
    getParents,
    getParent,
    createParent,
    updateParent,
    deleteParent
}