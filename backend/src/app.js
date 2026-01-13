const express = require('express')
const app = express()
app.use(express.json());  
const cookieParser = require('cookie-parser')
app.use(cookieParser())
const cors = require('cors')
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


const authTeacher = require('./routes/auth.routes')
app.use('/api/teacher', authTeacher)


module.exports = app