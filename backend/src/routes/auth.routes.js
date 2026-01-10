const express = require('express')
const router = express.Router()
const app = express()

const authController = require('../controller/auth.controller')
router.get('/teachers', authController.getTeachers)
router.get('/teacher/:id', authController.getTeacher)
router.post('/register/teacher', authController.registerTeacher)
router.post('/login/teacher', authController.loginTeacher)


module.exports = router;