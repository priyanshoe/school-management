const pool = require('../../db/db')

async function getStubjects(req,res){
    try{

        const [data] = await pool.query('select s.*, group_concat(t.name) as teachers from subjects s left join subjects_teachers st on s.subject_id = st.subject_id left join teachers t on t.teacher_id = st.teacher_id  group by s.subject_id');
        if(data.length === 0) return res.status(409).json({message:"Data not found"})
            return res.status(200).json({message:"Data fetched", data:data})
    } catch (err){
        return res.status(500).json({message:err.message})
    }
}

module.exports = {
    getStubjects
}