const express = require('express')
const router = express.Router()

const teacherController = require('../controller/utils/teacher.controller')
router.get('/teacher/', teacherController.getTeachers)
router.get('/teacher/:id', teacherController.getTeacher)
router.post('/teacher/create', teacherController.createTeacher)
router.post('/teacher/update', teacherController.updateTeacher)
router.post('/teacher/delete',teacherController.deleteTeacher)


const studentController = require('../controller/utils/student.controller')
router.get('/student/', studentController.getStudents)
router.post('/student/create', studentController.createStudent)
router.post('/student/update', studentController.updateStudent)
router.post('/student/delete', studentController.deleteStudent)

module.exports = router;
