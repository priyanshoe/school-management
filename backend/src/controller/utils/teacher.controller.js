const pool = require('../../db/db')

async function getTeachers(req,res){
     try {
        const [users] = await pool.query("SELECT * FROM teachers")
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}
async function getTeacher(req,res){
    try{
        const userID = req.params.id
        const [user] = await pool.query("SELECT * FROM teachers WHERE teacher_id = ?",[userID])
        return res.json(user[0])
    } catch (err){
        console.error(err);
        return res.status(500).json({ message: "Teacher not found" });
    }
}

async function deleteTeacher(req,res){
    try{
        const {email}  = req.body;
        const [dbEmail] = await pool.query("SELECT email FROM teachers WHERE email = ?",[email])
        if(dbEmail.length === 0) return res.status(409).json({message: "data not found"})
        const deletedData = await pool.query("DELETE FROM teachers WHERE email = ?",[email])
        return res.status(200).json({message:"Data delete"});
    } catch (err){
        console.error(err);
        return res.status(500).json({ message: "Teacher deletion failed" });
    }
}

module.exports = {
    getTeachers,
    getTeacher,
    deleteTeacher
}