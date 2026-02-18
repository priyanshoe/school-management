const pool = require('../../db/db')
const bcrypt = require('bcrypt')


async function getTeachers(req, res) {
    try {
        const [users] = await pool.query("select tt.teacher_id, tt.name, tt.email, tt.photo, tt.phone, tt.address, tt.dob, tt.blood_group, tt.bio, group_concat(s.name) as subjects from teachers tt left join subjects_teachers st on tt.teacher_id = st.teacher_id left join subjects s on s.subject_id = st.subject_id group by tt.teacher_id;")
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function getTeacher(req, res) {
    try {
        const userID = req.params.id
        const [user] = await pool.query("SELECT * FROM teachers WHERE teacher_id = ?", [userID])
        return res.json(user[0])
    } catch (err) {
        return res.status(500).json({ message: "Teacher not found", error: err });
    }
}

async function createTeacher(req, res) {
    const connection = await pool.getConnection();
    try {
        const { name, email, photo, phone, address, subjects, dob, blood_group, bio, password } = req.body
        const [user] = await connection.query("SELECT * FROM teachers WHERE email = ?", [email])
        if (user.length > 0) return res.status(409).json({ message: "Teacher already exist" });
        const hashPassword = await bcrypt.hash(password, 10)
        await connection.beginTransaction();
        const [created] = await connection.query("INSERT INTO teachers (name, email,photo,phone,address,dob,blood_group,bio,password) VALUES (?,?,?,?,?,?,?,?,?)",
            [name, email, photo, phone, address, dob, blood_group, bio, hashPassword])
        const [subject_id] = await connection.query('select subject_id from subjects where name in(?)',[subjects]);
        if(subject_id.length != subjects.length) throw new Error("Some subject not found")
        const values = subject_id.map((item)=>[
            item.subject_id,
            created.insertId
        ])
        await connection.query("insert into subjects_teachers (subject_id,teacher_id) values ?", [values])
        await connection.commit();
        return res.status(200).json({ message: "Teacher added", data: created.insertId });
    } catch (err) {
        await connection.rollback();
        return res.status(500).json({ message: "Creation failed", error: err.message });
    } finally {
        connection.release()
    }
}

async function updateTeacher(req, res) {
    try {
        const { name, email, photo, phone, address, bio, blood_group, dob, teacher_id } = req.body;
        const [result] = await pool.query(
            "UPDATE teachers SET name=?,email=?,photo=?,phone=?,address=?,bio=?,blood_group=?,dob=? WHERE teacher_id=?",
            [name, email, photo, phone, address, bio, blood_group, dob, teacher_id]
        )
        if (result.affectedRows === 0) res.status(404).json({ message: "Teacher not found" });
        return res.status(200).json({ message: "Teacher update success" })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Teacher update failed", error: err });
    }

}

async function deleteTeacher(req, res) {
    try {
        const { email } = req.body;
        await pool.query("DELETE FROM teachers WHERE email = ?", [email])
        return res.status(200).json({ message: "Data delete" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Teacher deletion failed", error: err });
    }
}


module.exports = {
    getTeachers,
    getTeacher,
    createTeacher,
    deleteTeacher,
    updateTeacher
}