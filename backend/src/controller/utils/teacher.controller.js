const pool = require('../../db/db')
const bcrypt = require('bcrypt')


async function getTeachers(req, res) {
    try {
        const [users] = await pool.query("SELECT * FROM teachers")
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Server error",error:err });
    }
}

async function getTeacher(req, res) {
    try {
        const userID = req.params.id
        const [user] = await pool.query("SELECT * FROM teachers WHERE teacher_id = ?", [userID])
        return res.json(user[0])
    } catch (err) {
        return res.status(500).json({ message: "Teacher not found",error:err });
    }
}

async function createTeacher(req,res){
    try{
        const { name, email, photo, phone, address, dob, blood_group, bio, password } = req.body
        const [user] =  await pool.query("SELECT * FROM teachers WHERE email = ?",[email])
        if(user.length>0) return res.status(409).json({ message: "Teacher already exist"});
        const hashPassword = await bcrypt.hash(password, 10)
        const [created] = await pool.query("INSERT INTO teachers (name, email,photo,phone,address,dob,blood_group,bio,password) VALUES (?,?,?,?,?,?,?,?,?)",
                            [name, email,photo,phone,address,dob,blood_group,bio,hashPassword])
        return res.status(200).json({ message: "Teacher added", data: created.insertId });
    } catch (err){
        return res.status(500).json({ message: "Creation failed", error:err });
    }
}

async function updateTeacher(req, res) {
    try {
        const { name, email, photo, phone, address, bio, blood_group, dob, teacher_id } = req.body;
        const [result] = await pool.query(
            "UPDATE teachers SET name=?,email=?,photo=?,phone=?,address=?,bio=?,blood_group=?,dob=? WHERE teacher_id=?",
            [name, email, photo, phone, address, bio, blood_group, dob,teacher_id]
        )
        if (result.affectedRows === 0) res.status(404).json({ message: "Teacher not found" });
        return res.status(200).json({message:"Teacher update success"})
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Teacher update failed",error:err });
    }

}

async function deleteTeacher(req, res) {
    try {
        const { email } = req.body;
        await pool.query("DELETE FROM teachers WHERE email = ?", [email])
        return res.status(200).json({ message: "Data delete" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Teacher deletion failed",error:err });
    }
}


module.exports = {
    getTeachers,
    getTeacher,
    createTeacher,
    deleteTeacher,
    updateTeacher
}