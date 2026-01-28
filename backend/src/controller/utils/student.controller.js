const pool = require('../../db/db')
const bcrypt = require('bcrypt')


async function getStudents(req, res) {
    try {
        const [users] = await pool.query("SELECT * FROM students")
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}

async function getStudent(req, res) {
    try {
        const userID = req.params.id
        const [user] = await pool.query("SELECT * FROM students WHERE teacher_id = ?", [userID])
        return res.json(user[0])
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Teacher not found" });
    }
}

async function createStudent(req,res){
    try{
        const { name, email, photo, phone, class_name, address, dob, blood_group, bio, password } = req.body
        const [user] =  await pool.query("SELECT * FROM students WHERE email = ?",[email])
        if(user.length>0) return res.status(409).json({ message: "Student already exist"});
        const hashPassword = await bcrypt.hash(password, 10)
        const [created] = await pool.query("INSERT INTO students (name, email,photo,phone,class,address,dob,blood_group,bio,password) VALUES (?,?,?,?,?,?,?,?,?,?)",
                            [name, email,photo,phone,class_name,address,dob,blood_group,bio,hashPassword])
        return res.status(200).json({ message: "Student added", data: created.insertId });
    } catch (err){
        return res.status(500).json({ message: "Creation failed", error:err });
    }
}

async function updateStudent(req, res) {
    try {
        const { name, email, photo, phone, class_name, address, bio, blood_group, dob, student_id } = req.body;
        await pool.query(
            "UPDATE students SET name=?,email=?,photo=?,phone=?,class=?,address=?,bio=?,blood_group=?,dob=? WHERE student_id=?",
            [name, email, photo, phone, class_name, address, bio, blood_group, dob,student_id]
        )
        return res.status(200).json({message:"Student update success"})
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Student update failed" });
    }

}

async function deleteStudent(req, res) {
    try {
        const { email } = req.body;
        await pool.query("DELETE FROM students WHERE email = ?", [email])
        return res.status(200).json({ message: "Data delete" });
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