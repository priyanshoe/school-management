const pool = require("../../db/db")


async function getExamData(req,res){
  try{
    const [data] = await pool.query("select ed.date, st.name as subject , ct.name as class, tt.name as teacher from examData ed left join subjects st on st.subject_id = ed.subject_id left join classes ct on ct.class_id = ed.class_id left join teachers tt on tt.teacher_id = ed.teacher_id ;")
    if(data.length===0) return res.status(409).json({message:"Data not found"})
    return res.status(200).json({message:"Data fetched", data:data})
  } catch(err){
   return res.status(500).json({ message: "Server error", error: err.message });
  }
}

module.exports = {
    getExamData
}