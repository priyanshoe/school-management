const pool = require("../../db/db")


async function getAssignments(req,res){
  try{
    const [data] = await pool.query("select ad.assignment_id, ad.dueDate, st.name as subject , ct.name as class_name, tt.name as teacher, tt.email as teacher_email from assignmentData ad left join subjects st on st.subject_id = ad.subject_id left join classes ct on ct.class_id = ad.class_id left join teachers tt on tt.teacher_id = ad.teacher_id ;")
    return res.status(200).json({message:"Data fetched", data:data})
  } catch(err){
   return res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function createAssignment(req,res){
    try{
        const {subject,dueDate,class_name,teacher} = req.body;
        const [subject_id] = await pool.query("select subject_id from subjects where name=?",[subject])
        if(subject_id.length===0) return res.status(404).json({message:"Subject not found"})
        const [class_id] = await pool.query("select class_id from classes where name=?",[class_name])
        if(class_id.length===0) return res.status(404).json({message:"Class not found"})
        const [teacher_id] = await pool.query("select teacher_id from teachers where email=?",[teacher])
        if(teacher_id.length===0) return res.status(404).json({message:"Teacher not found"})
        const [create] = await pool.query('INSERT INTO assignmentData (subject_id, dueDate, class_id, teacher_id) values (?,?,?,?)',[subject_id[0].subject_id,dueDate,class_id[0].class_id,teacher_id[0].teacher_id])
        if(create.affectedRows===0) return res.status(409).json({message:"Assignment data not added"})
        return res.status(201).json({message:"Assignment data created", data:create.insertId})
    }catch(err){
   return res.status(500).json({ message: "Server error", error: err.message });
  }
}


async function updateAssignment(req,res){
    try{
        const {subject,dueDate,class_name,teacher_email, assignment_id} = req.body;
        const [subject_id] = await pool.query("select subject_id from subjects where name=?",[subject])
        if(subject_id.length===0) return res.status(404).json({message:"Subject not found"})
        const [class_id] = await pool.query("select class_id from classes where name=?",[class_name])
        if(class_id.length===0) return res.status(404).json({message:"Class not found"})
        const [teacher_id] = await pool.query("select teacher_id from teachers where email=?",[teacher_email])
        if(teacher_id.length===0) return res.status(404).json({message:"Teacher not found"})
        const [update] = await pool.query('update assignmentData set subject_id=?, dueDate=?, class_id=?, teacher_id=? where assignment_id=?',[subject_id[0].subject_id,dueDate,class_id[0].class_id,teacher_id[0].teacher_id,assignment_id])
        if(update.affectedRows===0) return res.status(404).json({message:"Assignment not found"})
        return res.json({message:"assignment data updated"})
    }catch(err){
   return res.status(500).json({ message: "Server error", error: err.message });
  }
}


async function deleteAssignment(req,res){
    try{
        const { subject,class_name} = req.body;
        const [subject_id] = await pool.query("select subject_id from subjects where name=?",[subject])
        if(subject_id.length===0) return res.status(404).json({message:"Subject not found"})
        const [class_id] = await pool.query("select class_id from classes where name=?",[class_name])
        if(class_id.length===0) return res.status(404).json({message:"Class not found"})
        const [deleted] = await pool.query('delete from assignmentData where subject_id=? and class_id=?',[subject_id[0].subject_id,class_id[0].class_id])
        if(deleted.affectedRows===0) return res.status(404).json({message:"Assignment not found"})
        return res.status(204).send()
    }catch(err){
   return res.status(500).json({ message: "Server error", error: err.message });
  }
}

module.exports = {
    getAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment
}
