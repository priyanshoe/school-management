const pool  = require("../../db/db")

async function getLessons(req,res){
    try{
        const [data] = await pool.query("select lt.lessons_id, st.name as subject,ct.name as class,tt.name as teacher, tt.email as teacher_email from lessons lt left join subjects st on st.subject_id=lt.subject_id left join classes ct on ct.class_id=lt.class_id left join teachers tt on tt.teacher_id=lt.teacher_id")
        return res.status(200).json({message:"Data fetched", data:data})
    } catch (err) {
        return res.status(500).json({ message: "Data not found", error: err.message })
    }
}

async function createLesson(req,res){
    try{
        const {subject,class_name,teacher} = req.body;
        const [subject_id] = await pool.query("select subject_id from subjects where name=?",[subject])
        if(subject_id.length===0) return res.status(404).json({message:"Subject not found"})
        const [class_id] = await pool.query("select class_id from classes where name=?",[class_name])
        if(class_id.length===0) return res.status(404).json({message:"Class not found"})
        const [teacher_id] = await pool.query("select teacher_id from teachers where email=?",[teacher])
        if(teacher_id.length===0) return res.status(404).json({message:"Teacher not found"})
        const [create] = await pool.query('INSERT INTO lessons (subject_id, class_id, teacher_id) values (?,?,?)',[subject_id[0].subject_id,class_id[0].class_id,teacher_id[0].teacher_id])
        if(create.affectedRows===0) return res.status(409).json({message:"lesson data not added"})
        return res.json({message:"lesson data created", data:create.insertId})
    }catch(err){
   return res.status(500).json({ message: "Server error", error: err.message });
  }
}



async function updateLesson(req,res){
    try{
        const {subject,class_name,teacher, lesson_id} = req.body;
        const [subject_id] = await pool.query("select subject_id from subjects where name=?",[subject])
        if(subject_id.length===0) return res.status(404).json({message:"Subject not found"})
        const [class_id] = await pool.query("select class_id from classes where name=?",[class_name])
        if(class_id.length===0) return res.status(404).json({message:"Class not found"})
        const [teacher_id] = await pool.query("select teacher_id from teachers where email=?",[teacher])
        if(teacher_id.length===0) return res.status(404).json({message:"Teacher not found"})
        const [update] = await pool.query('update lessons set subject_id=?, class_id=?, teacher_id=? where lessons_id=?',[subject_id[0].subject_id,class_id[0].class_id,teacher_id[0].teacher_id,lesson_id])
        if(update.affectedRows===0) return res.status(409).json({message:"lessons data not update"})
        return res.json({message:"lessons data updated"})
    }catch(err){
   return res.status(500).json({ message: "Server error", error: err.message });
  }
}


async function deleteLesson(req,res){
    try{
        const { subject,class_name} = req.body;
        const [subject_id] = await pool.query("select subject_id from subjects where name=?",[subject])
        if(subject_id.length===0) return res.status(404).json({message:"Subject not found"})
        const [class_id] = await pool.query("select class_id from classes where name=?",[class_name])
        if(class_id.length===0) return res.status(404).json({message:"Class not found"})
        const [deleted] = await pool.query('delete from lessons where subject_id=? and class_id=?',[subject_id[0].subject_id,class_id[0].class_id])
        if(deleted.affectedRows===0) return res.status(409).json({message:"lesson data not delete"})
        return res.json({message:"lesson data deleted",data:{subject:subject,class:class_name}})
    }catch(err){
   return res.status(500).json({ message: "Server error", error: err.message });
  }
}

module.exports={
    getLessons,
    createLesson,
    updateLesson,
    deleteLesson
}