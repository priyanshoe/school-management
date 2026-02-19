const pool = require('../../db/db')
const bcrypt = require('bcrypt')


async function getTeachers(req, res) {
    try {
        const [users] = await pool.query("select tt.teacher_id, tt.name, tt.email, tt.photo, tt.phone, tt.address, tt.dob, tt.blood_group, tt.bio, group_concat(distinct s.name) as subjects, group_concat(distinct c.name) as classes from teachers tt left join subjects_teachers st on tt.teacher_id = st.teacher_id left join subjects s on s.subject_id = st.subject_id left join classes_teachers ct on ct.teacher_id = tt.teacher_id left join classes c on c.class_id = ct.class_id group by tt.teacher_id;")
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
        const { name, email, photo, phone, address, subjects, classes, dob, blood_group, bio, password } = req.body
        const [user] = await connection.query("SELECT * FROM teachers WHERE email = ?", [email])
        if (user.length > 0) return res.status(409).json({ message: "Teacher already exist" });
        const hashPassword = await bcrypt.hash(password, 10)
        await connection.beginTransaction();
        const [created] = await connection.query("INSERT INTO teachers (name, email,photo,phone,address,dob,blood_group,bio,password) VALUES (?,?,?,?,?,?,?,?,?)",
            [name, email, photo, phone, address, dob, blood_group, bio, hashPassword])
        if (subjects.length > 0) {
            const [subject_id] = await connection.query('select subject_id from subjects where name in(?)', [subjects]);
            if (subject_id.length != subjects.length) throw new Error("Some subject not found")
            const values = subject_id.map((item) => [
                item.subject_id,
                created.insertId
            ])
            const [result] = await connection.query("insert into subjects_teachers (subject_id,teacher_id) values ?", [values])
            if(result.affectedRows === 0) throw new Error("Subject not added");
        }
        if(classes.length>0){
            const [classes_id] = await connection.query("select class_id from classes where name in(?)",[classes]);
            if(classes_id.length != classes.length) throw new Error("Some claases not found")
            const values = classes_id.map((item)=>[
                item.class_id,
                created.insertId
            ])
            const [result] = await connection.query('insert into classes_teachers (class_id,teacher_id) values ?',[values])
            if(result.affectedRows === 0) throw new Error("Class not added");
        }
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
    const connection = await pool.getConnection();
    try {
        const { name, email, photo, phone, subjects, classes, address, bio, blood_group, dob, teacher_id } = req.body;
        const [result] = await connection.query(
            "UPDATE teachers SET name=?,email=?,photo=?,phone=?,address=?,bio=?,blood_group=?,dob=? WHERE teacher_id=?",
            [name, email, photo, phone, address, bio, blood_group, dob, teacher_id]
        )
        if (result.affectedRows === 0) return res.status(404).json({ message: "Teacher not found" });
        if (subjects.length > 0) {
            await connection.beginTransaction();
            const [result_ids] = await connection.query('select subject_id from subjects where name in(?)', [subjects])
            if (result_ids.length === 0) return res.status(404).json({ message: "Subjects not found" })
            await connection.query("delete from subjects_teachers where teacher_id = ?", [teacher_id]);
            const values = result_ids.map((item) => [
                item.subject_id,
                teacher_id
            ])
            const [insert_subjects] = await connection.query('insert into subjects_teachers (subject_id, teacher_id) values ?', [values])
            if (insert_subjects.affectedRows === 0) throw new Error("Error in uptating Subjects")
            }
        if(classes.length>0){
            await connection.beginTransaction();
            const [class_ids] = await connection.query('select class_id from classes where name in(?)',[classes])
            if(class_ids.length === 0) return res.status(404).json({message:"Classes not found"})
            await connection.query('delete from classes_teachers where teacher_id = ?',[teacher_id])
            const values = class_ids.map((item)=>[
                item.class_id,
                teacher_id
            ])
            const [insert_classes] = await connection.query('insert into classes_teachers (class_id,teacher_id) values ?', [values])
            if(insert_classes.affectedRows === 0) throw new Error("Error in updating classes")
        }

        await connection.commit()
        return res.status(200).json({ message: "Teacher update success" })
    } catch (err) {
        await connection.rollback();
        console.error(err);
        return res.status(500).json({ message: "Teacher update failed", error: err.message });
    } finally {
        connection.release()
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