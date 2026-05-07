const express = require("express");
const router = express.Router();

// TEACHER
const teacherController = require("../controller/utils/teacher.controller");
router.get("/teacher", teacherController.getTeachers);
router.get("/teacher/:id", teacherController.getTeacher);
router.post("/teacher/create", teacherController.createTeacher);
router.patch("/teacher/update", teacherController.updateTeacher);
router.delete("/teacher/delete", teacherController.deleteTeacher);

// STUDENT
const studentController = require("../controller/utils/student.controller");
router.get("/student", studentController.getStudents);
router.get("/student/:id", studentController.getStudent);
router.post("/student/create", studentController.createStudent);
router.patch("/student/update", studentController.updateStudent);
router.delete("/student/delete", studentController.deleteStudent);

// PARENT
const parentController = require("../controller/utils/parent.controller");
router.get("/parent", parentController.getParents);
router.get("/parent/:id", parentController.getParent);
router.post("/parent/create", parentController.createParent);
router.patch("/parent/update", parentController.updateParent);
router.delete("/parent/delete", parentController.deleteParent);

// UTILS
const utilsController = require("../controller/utils/utils.controller");
router.post("/add/student", utilsController.addStudent);
router.delete("/remove/student", utilsController.removeStudent);

// SUBJECT
const subjectController = require("../controller/utils/subject.controller");
router.get("/subject", subjectController.getSubjects);
router.post("/subject/create", subjectController.createSubject);
router.patch("/subject/update", subjectController.updateSubject);
router.delete("/subject/delete", subjectController.deleteSubject);

// CLASSES
const classesController = require("../controller/utils/classes.controller");
router.get("/class", classesController.getClasses);
router.post("/class/create", classesController.createClass);
router.patch("/class/update", classesController.updateClass);
router.delete("/class/delete", classesController.deleteClass);

// EXAM
const examController = require("../controller/utils/exam.controller")
router.get("/exam", examController.getExamData)
router.post("/exam/create", examController.createExam)
router.patch('/exam/update',examController.updateExam)
router.delete("/exam/delete",examController.deleteExam)

module.exports = router;
