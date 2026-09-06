const express = require('express')
const router = express.Router()
const { authenticate } = require('../middleware/auth.middleware')

router.get('/session', authenticate, (req, res) => {
  res.status(200).json({ message: 'Session active', data: req.user });
})

// TEACHER
const authTeacherController = require('../controller/auth/auth.teacher.controller')
router.post('/teacher/signUp', authTeacherController.signUpTeacher)
router.post('/teacher/signIn', authTeacherController.signInTeacher)
router.post('/teacher/signOut', authTeacherController.signOutTeacher)

// STUDENT
const authStudentController = require('../controller/auth/auth.student.controller')
router.post('/student/signUp', authStudentController.signUpStudent)
router.post('/student/signIn', authStudentController.signInStudent)
router.post('/student/signOut', authStudentController.signOutStudent)

// PARENT
const authParentController = require('../controller/auth/auth.parent.controller')
router.post('/parent/signUp', authParentController.signUpParent)
router.post('/parent/signIn', authParentController.signInParent)
router.post('/parent/signOut', authParentController.signOutParent)


module.exports = router;
