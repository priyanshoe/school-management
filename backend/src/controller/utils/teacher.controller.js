const pool = require('../../db/db')
const bcrypt = require('bcrypt')


async function getTeachers(req, res) {
    try {
        const [users] = await pool.query("SELECT * FROM teachers")
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}

async function getTeacher(req, res) {
    try {
        const userID = req.params.id
        const [user] = await pool.query("SELECT * FROM teachers WHERE teacher_id = ?", [userID])
        return res.json(user[0])
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Teacher not found" });
    }
}

async function createTeacher(req,res){
    try{
        const { name, email, photo, phone, address, dob, blood_group, bio, password } = req.body
        const [user] =  await pool.query("SELECT * FROM teachers WHERE email = ?",[email])
        if(user.length>0) return res.status(409).json({ message: "Teacher already exist"});
        const hashPassword = await bcrypt.hash(password, 10)
        const [created] = await pool.query("INSERT INTO teachers (name, email,photo,phone,address,dob,blood_group,bio,password,role) VALUES (?,?,?,?,?,?,?,?,?,?)",
                            [name, email,photo,phone,address,dob,blood_group,bio,hashPassword,"teacher"])
        return res.status(200).json({ message: "Teacher added", data: created.insertId });
    } catch (err){
        return res.status(500).json({ message: "Creation failed", err });
    }
}

async function updateTeacher(req, res) {
    try {
        const { name, email, photo, phone, address, bio, blood_group, dob, teacher_id } = req.body;
        await pool.query(
            "UPDATE teachers SET name=?,email=?,photo=?,phone=?,address=?,bio=?,blood_group=?,dob=? WHERE teacher_id=?",
            [name, email, photo, phone, address, bio, blood_group, dob,teacher_id]
        )
        return res.status(200).json({message:"Teacher update success"})
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Teacher update failed" });
    }

}

async function deleteTeacher(req, res) {
    try {
        const { email } = req.body;
        await pool.query("DELETE FROM teachers WHERE email = ?", [email])
        return res.status(200).json({ message: "Data delete" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Teacher deletion failed" });
    }
}


module.exports = {
    getTeachers,
    getTeacher,
    createTeacher,
    deleteTeacher,
    updateTeacher
}