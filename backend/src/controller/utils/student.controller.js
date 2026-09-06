const pool = require('../../db/db')
const bcrypt = require('bcrypt')


async function getStudents(req, res) {
    try {
        const [users] = await pool.query("select s.student_id, s.name, s.email, s.photo, s.phone, s.address, s.dob, s.blood_group, c.name as class,  group_concat(st.name) as subjects from students s left join classes c on c.class_id = s.class_id left join subjects_students ss on ss.student_id = s.student_id left join subjects st on st.subject_id = ss.subject_id group by (student_id)")
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function getStudent(req, res) {
    try {
        const userID = req.params.id
        const [user] = await pool.query("SELECT * FROM students WHERE student_id = ?", [userID])
        if (!user.length) return res.status(404).json({ message: "Student not found" });
        delete user[0].password;
        return res.status(200).json(user[0])
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
}

async function createStudent(req, res) {
    const connection = await pool.getConnection();
    try {
        const { name, email, photo, phone, class_name, subjects = [], address, dob, blood_group, bio, password } = req.body
        if (!name || !email || !password || !class_name) return res.status(400).json({ message: "Name, email, password and class are required" });
        const [user] = await connection.query("SELECT email FROM students WHERE email = ?", [email])
        if (user.length > 0) return res.status(409).json({ message: "Student already exist" });
        const [class_id] = await connection.query('select class_id from classes where name = ?',[class_name])
        if(class_id.length === 0) {
            await connection.rollback();
            return res.status(404).json({message:"Class not found"});
        }
        const hashPassword = await bcrypt.hash(password, 10)
        await connection.beginTransaction();
        const [created] = await connection.query("INSERT INTO students (name, email,photo,phone,class_id,address,dob,blood_group,bio,password) VALUES (?,?,?,?,?,?,?,?,?,?)",
            [name, email, photo, phone, class_id[0].class_id, address, dob, blood_group, bio, hashPassword])
        if(subjects.length>0){
            const [subjects_id] = await connection.query('select subject_id from subjects where name in(?)',[subjects])
            if(subjects_id.length != subjects.length) throw new Error("Some subjects not found")
            const values = subjects_id.map((item)=>[
                item.subject_id,
                created.insertId
            ])
            const [result] = await connection.query('insert into subjects_students (subject_id,student_id) values ?',[values])
            if(result.affectedRows === 0) throw new Error("Subjet not saved")
        }
            await connection.commit()
        return res.status(201).json({ message: "Student added", data: created.insertId });
    } catch (err) {
        await connection.rollback();
        console.log(err);
        
        return res.status(500).json({ message: "Creation failed", error: err.message });
    } finally {
        connection.release();
    }
}

async function updateStudent(req, res) {
    const connection = await pool.getConnection()
    try {
        const { name, email, photo, phone, class_name, subjects = [], address, bio, blood_group, dob, student_id } = req.body;
        if (!student_id || !name || !email || !class_name) return res.status(400).json({ message: "Student id, name, email and class are required" });
        await connection.beginTransaction();
        const [class_id] = await connection.query('select class_id from classes where name = ?',[class_name]);
        if(class_id.length === 0) return res.status(404).json({message:"Class not found"})
        const [result] = await connection.query(
            "UPDATE students SET name=?,email=?,photo=?,phone=?,class_id=?,address=?,bio=?,blood_group=?,dob=? WHERE student_id=?",
            [name, email, photo, phone, class_id[0].class_id, address, bio, blood_group, dob, student_id])
        if (result.affectedRows === 0) {
            await connection.rollback();
            return res.status(404).json({ message: "Student not found" });
        }
        {
            const [subjects_id] = await connection.query('select subject_id from subjects where name in (?)',[subjects]);
            if(subjects_id.length != subjects.length) throw new Error("Some subjects not found");
            await connection.query("delete from subjects_students where student_id = ?",[student_id]);
            if (subjects_id.length) {
                const values = subjects_id.map((item)=>[item.subject_id, student_id]);
                const [insert_subjects] = await connection.query("insert into subjects_students (subject_id,student_id) values ?",[values]);
                if(insert_subjects.affectedRows === 0) throw new Error("Subjects not saved");
            }
        }
        await connection.commit();
        return res.status(200).json({ message: "Student update success" })
    } catch (err) {
        await connection.rollback()
        console.error(err);
        return res.status(500).json({ message: "Student update failed", error: err.message });
    } finally {
        connection.release()
    }

}

async function deleteStudent(req, res) {
    try {
        const { email } = req.body;
        const [result] = await pool.query("DELETE FROM students WHERE email = ?", [email])
        if (!result.affectedRows) return res.status(404).json({ message: "Student not found" });
        return res.status(204).send();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Student deletion failed" });
    }
}


module.exports = {
    getStudents,
    getStudent,
    createStudent,
    deleteStudent,
    updateStudent
}
