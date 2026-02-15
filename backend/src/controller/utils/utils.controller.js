const pool = require('../../db/db')

async function addStudent(req, res) {
    try {
        const { email, parent_id } = req.body;
        const [student_result] = await pool.query('SELECT student_id FROM students WHERE email = ?', [email]);
        if (student_result.length === 0) return res.status(409).json({ message: "Student not found" })
        const [check_dublicate] = await pool.query('SELECT * FROM parents_students WHERE parent_id = ? AND student_id = ?',
            [parent_id, student_result[0].student_id])
            if(check_dublicate.length > 0) return res.status(409).json({message:"Student already added"})
        await pool.query('INSERT INTO parents_students (parent_id, student_id) VALUES (?,?)',
            [parent_id, student_result[0].student_id])
        return res.status(200).json("Student added")
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}


async function removeStudent(req,res){
    try{
        const {email, parent_id} = req.body;
        const [student_id] = await pool.query('SELECT student_id FROM students WHERE email = ?', [email]);
        if(student_id.length === 0) return res.status(409).json({message:"Student not found"});
        await pool.query('DELETE FROM parents_Students WHERE parent_id = ? AND student_id = ?',
            [parent_id, student_id[0].student_id]);
        return res.status(200).json({message: "Student removed"})
    } catch(err){
        return  console.log(err);
        
        res.status(500).json({message : err.message})
    }
}

module.exports = {
    addStudent,
    removeStudent
}