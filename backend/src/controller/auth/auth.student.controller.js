const pool = require('../../db/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



async function signUpStudent(req,res){
    try{
        const { name, email, photo, phone, class_name, address, dob, blood_group, bio, password } = req.body
        if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required" });
        const [user] =  await pool.query("SELECT email FROM students WHERE email = ?",[email])
        if(user.length>0) return res.status(409).json({ message: "Student already exist"});
        const hashPassword = await bcrypt.hash(password, 10)
        // Public sign-up does not select a class; use class_id only when a
        // valid class has been supplied, matching the students table used by
        // the CRUD controller.
        let classId = null;
        if (class_name) {
            const [classes] = await pool.query("SELECT class_id FROM classes WHERE name = ?", [class_name]);
            if (!classes.length) return res.status(404).json({ message: "Class not found" });
            classId = classes[0].class_id;
        }
        const [created] = await pool.query("INSERT INTO students (name, email,photo,phone,class_id,address,dob,blood_group,bio,password) VALUES (?,?,?,?,?,?,?,?,?,?)",
                            [name, email,photo,phone,classId,address,dob,blood_group,bio,hashPassword])
        const token = jwt.sign({id:created.insertId, role:'student'}, process.env.JWT_SECRETE, { expiresIn: '7d' })
        res.cookie('token',token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/'
        });        
        return res.status(201).json({ message: "SignUp Success", data: created.insertId });
    } catch (err){
        return res.status(500).json({ message: "SignIn failed", error:err });
    }
}

async function signInStudent(req,res){
    try{
        const {email , password} = req.body;
        let [user] =  await pool.query("SELECT student_id AS id, password, 'student' AS role FROM students WHERE email = ?",[email])
        if(user.length === 0) return res.status(401).json({message:"Wrong Credential"});
        const hashPassword = await bcrypt.compare(password, user[0].password)
        if(!hashPassword) return res.status(401).json({message:"Wrong Credential"});
        delete user[0].password        
        const token = jwt.sign({id:user[0].id, role: user[0].role}, process.env.JWT_SECRETE, { expiresIn: '7d' })
        res.cookie('token',token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/'
        });
        return res.status(200).json({ message: "LogIn Success", data: user[0] });
    } catch(err){
        return res.status(500).json({ message: "SignIn failed", error: err });
    }
}

async function signOutStudent(req,res){
    try{
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/'
        });
        return res.status(200).json({ message: 'Logged out successfully' });

    } catch (err) {
        return res.status(500).json({ message: "Logout failed" });
    }
}

module.exports = {
    signUpStudent,
    signInStudent,
    signOutStudent
}
