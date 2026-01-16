const express = require('express')
const router = express.Router()

const authTeacherController = require('../controller/auth/auth.teacher.controller')
router.post('/teacher/signUp', authTeacherController.signUpTeacher)
router.post('/teacher/signIn', authTeacherController.signInTeacher)
router.post('/teacher/signOut', authTeacherController.signOutTeacher)


module.exports = router;