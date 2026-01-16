const pool = require('../../db/db')

async function getTeachers(req,res){
     try {
        const [users] = await pool.query("SELECT * FROM teachers")
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}
async function getTeacher(req,res){
    try{
        const userID = req.params.id
        const [user] = await pool.query("SELECT * FROM teachers WHERE teacher_id = ?",[userID])
        res.json(user[0])
    } catch (err){
        console.error(err);
        res.status(500).json({ message: "Teacher not found" });
    }
}

module.exports = {
getTeachers,
getTeacher
}