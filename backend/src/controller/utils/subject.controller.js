const pool = require('../../db/db')

async function getStubjects(req,res){
    try{

        const [data] = await pool.query('select * from subjects');
        if(data.length === 0) return res.status(409).json({message:"Data not found"})
            return res.status(200).json({message:"Data fetched", data:data})
    } catch (err){
        return res.status(500).json({message:err.message})
    }
}

module.exports = {
    getStubjects
}