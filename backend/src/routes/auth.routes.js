const express = require('express')
const router = express.Router()

const authTeacherController = require('../controller/auth/auth.teacher.controller')
router.post('/teacher/signUp', authTeacherController.signUpTeacher)
router.post('/teacher/signIn', authTeacherController.signInTeacher)
router.post('/teacher/signOut', authTeacherController.signOutTeacher)

const authStudentController = require('../controller/auth/auth.student.controller')
router.post('/student/signUp', authStudentController.signUpStudent)


module.exports = router;