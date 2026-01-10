const pool = require('../db/db')

function registerTeacher(req,res){

    res.send("Teahcer user regestered")
    
}

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
        const [created] = await pool.query("INSERT INTO teachers (name, email,photo,phone,address,dob,blood_group,bio,password) VALUES (?,?,?,?,?,?,?,?,?)",
                            [name, email,photo,phone,address,dob,blood_group,bio,password])
        return res.status(200).json({ message: "SignIn Success", data: created.insertId });
    } catch (err){
        return res.status(500).json({ message: "SignIn failed", err });
    }
}


async function loginTeacher(req,res){
    try{
        const {email , password} = req.body;
        const [user] =  await pool.query("SELECT * FROM teachers WHERE email = ?",[email])
        if(user.length === 0){
            return res.status(409).json({message:"Wrong Credential"});
        }
        if(user[0].password === password){
            return res.status(200).json({ message: "LogIn Success", data: user });
        }
        else{
            return res.status(409).json({message:"Wrong Credential"});
        }
    } catch(err){
        return res.status(500).json({ message: "SignIn failed", error: err });
    }
}
// setTeacher(
//   'Daniel Brooks',
//   'daniel.brooks@school.com',
//   'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
//   '5559876543',
//   '89 Pine Road, Denver, USA',
//   '1986-10-08',
//   'B+',
//   'Economics teacher focusing on real-world applications and financial literacy'
// )
module.exports = {
    registerTeacher,
    getTeachers,
    getTeacher,
    loginTeacher
}