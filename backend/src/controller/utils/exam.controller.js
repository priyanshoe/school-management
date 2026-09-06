const pool = require("../../db/db")


async function getExamData(req,res){
  try{
    const [data] = await pool.query("select ed.date, ed.exam_id, st.name as subject , ct.name as class, tt.name as teacher from examData ed left join subjects st on st.subject_id = ed.subject_id left join classes ct on ct.class_id = ed.class_id left join teachers tt on tt.teacher_id = ed.teacher_id ;")
    return res.status(200).json({message:"Data fetched", data:data})
  } catch(err){
   return res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function createExam(req,res){
    try{
        const {subject,date,class_name,teacher} = req.body;
        const [subject_id] = await pool.query("select subject_id from subjects where name=?",[subject])
        if(subject_id.length===0) return res.status(404).json({message:"Subject not found"})
        const [class_id] = await pool.query("select class_id from classes where name=?",[class_name])
        if(class_id.length===0) return res.status(404).json({message:"Class not found"})
        const [teacher_id] = await pool.query("select teacher_id from teachers where name=?",[teacher])
        if(teacher_id.length===0) return res.status(404).json({message:"Teacher not found"})
        const [create] = await pool.query('INSERT INTO examData (subject_id, date, class_id, teacher_id) values (?,?,?,?)',[subject_id[0].subject_id,date,class_id[0].class_id,teacher_id[0].teacher_id])
        if(create.affectedRows===0) return res.status(409).json({message:"Exam data not added"})
        return res.status(201).json({message:"Exam data created", data:create.insertId})
    }catch(err){
   return res.status(500).json({ message: "Server error", error: err.message });
  }
}


async function updateExam(req,res){
    try{
        const {subject,date,class_name,teacher, exam_id} = req.body;
        const [subject_id] = await pool.query("select subject_id from subjects where name=?",[subject])
        if(subject_id.length===0) return res.status(404).json({message:"Subject not found"})
        const [class_id] = await pool.query("select class_id from classes where name=?",[class_name])
        if(class_id.length===0) return res.status(404).json({message:"Class not found"})
        const [teacher_id] = await pool.query("select teacher_id from teachers where name=?",[teacher])
        if(teacher_id.length===0) return res.status(404).json({message:"Teacher not found"})
        const [update] = await pool.query('update examData set subject_id=?, date=?, class_id=?, teacher_id=? where exam_id=?',[subject_id[0].subject_id,date,class_id[0].class_id,teacher_id[0].teacher_id,exam_id])
        if(update.affectedRows===0) return res.status(404).json({message:"Exam not found"})
        return res.json({message:"exam data updated"})
    }catch(err){
   return res.status(500).json({ message: "Server error", error: err.message });
  }
}


async function deleteExam(req,res){
    try{
        const { subject,class_name} = req.body;
        const [subject_id] = await pool.query("select subject_id from subjects where name=?",[subject])
        if(subject_id.length===0) return res.status(404).json({message:"Subject not found"})
        const [class_id] = await pool.query("select class_id from classes where name=?",[class_name])
        if(class_id.length===0) return res.status(404).json({message:"Class not found"})
        const [deleted] = await pool.query('delete from examData where subject_id=? and class_id=?',[subject_id[0].subject_id,class_id[0].class_id])
        if(deleted.affectedRows===0) return res.status(404).json({message:"Exam not found"})
        return res.status(204).send()
    }catch(err){
   return res.status(500).json({ message: "Server error", error: err.message });
  }
}

module.exports = {
    getExamData,
    createExam,
    updateExam,
    deleteExam
}
