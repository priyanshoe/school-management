const express = require('express')
const router = express.Router()

// TEACHER
const teacherController = require('../controller/utils/teacher.controller')
router.get('/teacher', teacherController.getTeachers)
router.get('/teacher/:id', teacherController.getTeacher)
router.post('/teacher/create', teacherController.createTeacher)
router.patch('/teacher/update', teacherController.updateTeacher)
router.delete('/teacher/delete',teacherController.deleteTeacher)

// STUDENT
const studentController = require('../controller/utils/student.controller')
router.get('/student', studentController.getStudents)
router.get('/student/:id', studentController.getStudent)
router.post('/student/create', studentController.createStudent)
router.patch('/student/update', studentController.updateStudent)
router.delete('/student/delete', studentController.deleteStudent)

// PARENT
const parentController = require('../controller/utils/parent.controller')
router.get('/parent', parentController.getParents)
router.get('/parent/:id', parentController.getParent)
router.post('/parent/create', parentController.createParent)
router.patch('/parent/update', parentController.updateParent)
router.delete('/parent/delete',parentController.deleteParent)


module.exports = router;
