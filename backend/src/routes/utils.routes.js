const express = require('express')
const router = express.Router()

const teacherController = require('../controller/utils/teacher.controller')
router.get('/teacher/', teacherController.getTeachers)
router.get('/teacher/:id', teacherController.getTeacher)

module.exports = router;
