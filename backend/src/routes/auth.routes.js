const express = require('express')
const router = express.Router()
const app = express()

const authTeacherController = require('../controller/auth.teacher.controller')
router.get('/', authTeacherController.getTeachers)
router.get('/:id', authTeacherController.getTeacher)
router.post('/signUp', authTeacherController.signUpTeacher)
router.post('/signIn', authTeacherController.signInTeacher)
router.post('/signOut', authTeacherController.signOutTeacher)


module.exports = router;