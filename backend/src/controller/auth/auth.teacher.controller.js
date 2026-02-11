const pool = require('../../db/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



async function signUpTeacher(req,res){
    try{
        const { name, email, photo, phone, address, dob, blood_group, bio, password } = req.body
        const [user] =  await pool.query("SELECT email FROM teachers WHERE email = ?",[email])
        if(user.length>0) return res.status(409).json({ message: "Teacher already exist"});
        const hashPassword = await bcrypt.hash(password, 10)
        const [created] = await pool.query("INSERT INTO teachers (name, email,photo,phone,address,dob,blood_group,bio,password) VALUES (?,?,?,?,?,?,?,?,?)",
                            [name, email,photo,phone,address,dob,blood_group,bio,hashPassword])
        const token = jwt.sign({id:created.insertId, role:'teacher'}, process.env.JWT_SECRETE)
        res.cookie('token',token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
        });        
        return res.status(200).json({ message: "SignIn Success", data: created.insertId });
    } catch (err){
        return res.status(500).json({ message: "SignIn failed", error:err });
    }
}

async function signInTeacher(req,res){
    try{
        const {email , password} = req.body;
        let [user] =  await pool.query("SELECT teacher_id AS id, password, 'teacher' AS role FROM teachers WHERE email = ?",[email])
        if(user.length === 0) return res.status(409).json({message:"Wrong Credential"});
        const hashPassword = await bcrypt.compare(password, user[0].password)
        if(!hashPassword) return res.status(409).json({message:"Wrong Credential"});
        delete user[0].password        
        const token = jwt.sign({id:user[0].id, role: user[0].role}, process.env.JWT_SECRETE)
        res.cookie('token',token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
        });
        return res.status(200).json({ message: "LogIn Success", data: user[0] });
    } catch(err){
        return res.status(500).json({ message: "SignIn failed", error: err });
    }
}

async function signOutTeacher(req,res){
    try{
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
        });
        return res.status(200).json({ message: 'Logged out successfully' });

    } catch {
        return res.status(500).json({ message: "Logout failed", error:err });
    }
}

module.exports = {
    signUpTeacher,
    signInTeacher,
    signOutTeacher
}