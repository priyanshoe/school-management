const db = require('../../db/db')
const bcrypt = require('bcrypt')


async function getParents(req,res){
    try{
        const getUsers = 'SELECT * FROM parents';
        const [users] = await db.query(getUsers);
        return res.status(200).json({message:"Data fetched success", data:users})
    } catch (err) {
        return res.status(500).json({ message: "Data not found", error: err })
    }
}

async function getParent(req,res){
    try{
        const {id} = req.body;
        const getParent = 'SELECT * FROM parents WHERE parent_id = ?'
        const [user] = await db.query(getParent,[id]);
        return res.status(200).json({message:"Data fetched success", data:user})
    } catch (err) {
        return res.status(500).json({ message: "Data not found", error: err })
    }
}


async function createParent(req, res) {
    try {
        const { name, email, phone, address, dob, blood_group, password } = req.body.parentData;
        const studentEmails = req.body.studentEmails
        const checkParent = 'SELECT email FROM parents WHERE email = ?'
        const [user] = await db.query(checkParent, [email]);
        if (user.length > 0) return res.status(409).json({ message: "Parent alreay exist" })
        const hash = await bcrypt.hash(password, 10);
        const insertParent = 'INSERT INTO parents (name,email,phone,address,dob,blood_group,password) VALUES (?,?,?,?,?,?,?)';
        const [inserted] = await db.query(insertParent, [name, email, phone, address, dob, blood_group, hash])
        return res.status(200).json({ message: "Parent added" , id:inserted.insertId })
    } catch (err) {
        return res.status(500).json({ message: "Creation failed", error: err })
    }
}


async function updateParent(req,res){
    try{
        const { name, email, phone, address, dob, blood_group, parent_id } = req.body;
        const updateParent = 'UPDATE parents SET name=?, email=?, phone=?, address=?, dob=?, blood_group=? WHERE parent_id = ?'
        const updated = await db.query(updateParent,[ name, email, phone, address, dob, blood_group, parent_id ])
        return res.status(200).json({message:"Parent Update success"})
    } catch (err) {
        return res.status(500).json({ message: "Parent Update failed", error: err })
    }
}


async function deleteParent(req, res) {
    try {
        const { email } = req.body;
        await db.query("DELETE FROM parents WHERE email = ?", [email])
        return res.status(200).json({ message: "Data delete" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Teacher deletion failed",error:err });
    }
}

module.exports = {
    getParents,
    getParent,
    createParent,
    updateParent,
    deleteParent
}