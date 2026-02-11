const db = require('../../db/db')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')


async function signUpParent(req, res) {
    try {
        const { name, email, phone, address, dob, blood_group, password } = req.body.parentData;
        const checkParent = 'SELECT email FROM parents WHERE email = ?'
        const [user] = await db.query(checkParent, [email]);
        if (user.length > 0) return res.status(409).json({ message: "User already exist" })
        const hash = await bcrypt.hash(password, 10);
        const insertParent = 'INSERT INTO parents (name,email,phone,address,dob,blood_group,password) VALUES (?,?,?,?,?,?,?)';
        const [inserted] = await db.query(insertParent, [name, email, phone, address, dob, blood_group, hash])
        const token = JWT.sign({ userId: inserted.insertId, role: "parent" }, process.env.JWT_SECRETE)
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
        })
        return res.status(200).json({ message: "SignIn success" })
    } catch (err) {
        return res.status(500).json({ message: "SignIn failed", error: err })
    }
}


async function signInParent(req, res) {
    try {
        const { email, password } = req.body;
        const checkUser = 'SELECT parent_id AS id, password, "parent" AS role FROM parents WHERE email = ?'
        const [user] = await db.query(checkUser, [email]);
        if (user.length === 0) return res.status(409).json({ message: "User not exist" })
        const hashPassword = await bcrypt.compare(password, user[0].password)
        if (!hashPassword) return res.status(409).json({ message: "Wrong Credential" })
        delete user[0].password
        const token = JWT.sign({ id: user[0].id, role: user[0].role }, process.env.JWT_SECRETE)
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
        });
        return res.status(200).json({ message: "LogIn Success", data: user[0] });
    } catch (err) {
        return res.status(500).json({ message: "SignUp failed", error: err })
    }
}


async function signOutParent(req,res){
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
    signUpParent,
    signInParent,
    signOutParent
}