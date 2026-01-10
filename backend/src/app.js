const express = require('express')
const app = express()
app.use(express.json());  
const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.get("/",(req,res) =>{
    res.send("Helooo")
})

const auth = require('./routes/auth.routes')
app.use('/api/auth', auth)


module.exports = app