const pool = require('../db/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
        res.json(user)
    } catch (err){
        console.error(err);
        res.status(500).json({ message: "Teacher not found" });
    }
}


async function registerTeacher(req,res){
    try{
        const { name, email, photo, phone, address, dob, blood_group, bio, password } = req.body
        const [user] =  await pool.query("SELECT * FROM teachers WHERE email = ?",[email])
        if(user.length>0) return res.status(409).json({ message: "Teacher already exist"});
        const hashPassword = await bcrypt.hash(password, 10)
        const [created] = await pool.query("INSERT INTO teachers (name, email,photo,phone,address,dob,blood_group,bio,password) VALUES (?,?,?,?,?,?,?,?,?)",
                            [name, email,photo,phone,address,dob,blood_group,bio,hashPassword])
        const token = jwt.sign({id:created.insertId}, 'secret_code')
        res.cookie('token',token);        
        return res.status(200).json({ message: "SignIn Success", data: created.insertId });
    } catch (err){
        return res.status(500).json({ message: "SignIn failed", err });
    }
}
async function check() {
    const token = jwt.sign({id:23}, 'secret_code')
    const verify = jwt.verify(token, 'secret_code')
        console.log(verify.id);
}
check()

async function loginTeacher(req,res){
    try{
        const {email , password} = req.body;
        const [user] =  await pool.query("SELECT * FROM teachers WHERE email = ?",[email])
        if(user.length === 0) return res.status(409).json({message:"Wrong Credential"});
        const hashPassword = await bcrypt.compare(password, user[0].password)
        if(!hashPassword) return res.status(409).json({message:"Wrong Credential"});
        const token = jwt.sign({id:user[0].id}, 'secret_code')
        res.cookie('token',token);
        return res.status(200).json({ message: "LogIn Success", data: user });
    } catch(err){
        return res.status(500).json({ message: "SignIn failed", error: err });
    }
}

module.exports = {
    registerTeacher,
    getTeachers,
    getTeacher,
    loginTeacher
}