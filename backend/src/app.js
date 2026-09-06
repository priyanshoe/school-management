const express = require('express')

const app = express()
app.use(express.json());

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const cors = require('cors')
app.use(cors({
  origin: process.env.ACCESS_URL || 'http://localhost:3000',
  credentials: true
}));

app.get(['/health', '/'], (req, res) => res.status(200).json({ message: 'server running' }));

const authUser = require('./routes/auth.routes')
app.use('/api/auth', authUser)

const utilsFun = require('./routes/utils.routes')
app.use('/api', utilsFun)

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Unexpected server error' });
});


module.exports = app
