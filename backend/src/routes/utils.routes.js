const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth.middleware");

// TEACHER
const teacherController = require("../controller/utils/teacher.controller");
router.get("/teacher", teacherController.getTeachers);
router.get("/teacher/:id", teacherController.getTeacher);
router.post("/teacher/create", authenticate, authorize(["admin"]), teacherController.createTeacher);
router.patch("/teacher/update", authenticate, authorize(["admin", "teacher"]), teacherController.updateTeacher);
router.post("/teacher/update", authenticate, authorize(["admin", "teacher"]), teacherController.updateTeacher); // fallback for form-modal
router.delete("/teacher/delete", authenticate, authorize(["admin"]), teacherController.deleteTeacher);
router.post("/teacher/delete", authenticate, authorize(["admin"]), teacherController.deleteTeacher); // fallback for form-modal

// STUDENT
const studentController = require("../controller/utils/student.controller");
router.get("/student", studentController.getStudents);
router.get("/student/:id", studentController.getStudent);
router.post("/student/create", authenticate, authorize(["admin"]), studentController.createStudent);
router.patch("/student/update", authenticate, authorize(["admin", "teacher"]), studentController.updateStudent);
router.post("/student/update", authenticate, authorize(["admin", "teacher"]), studentController.updateStudent); // fallback
router.delete("/student/delete", authenticate, authorize(["admin"]), studentController.deleteStudent);
router.post("/student/delete", authenticate, authorize(["admin"]), studentController.deleteStudent); // fallback

// PARENT
const parentController = require("../controller/utils/parent.controller");
router.get("/parent", parentController.getParents);
router.get("/parent/:id", parentController.getParent);
router.post("/parent/create", authenticate, authorize(["admin"]), parentController.createParent);
router.patch("/parent/update", authenticate, authorize(["admin", "parent"]), parentController.updateParent);
router.delete("/parent/delete", authenticate, authorize(["admin"]), parentController.deleteParent);

// UTILS (parent-student relationship)
const utilsController = require("../controller/utils/utils.controller");
router.post("/add/student", authenticate, authorize(["admin", "parent"]), utilsController.addStudent);
router.delete("/remove/student", authenticate, authorize(["admin", "parent"]), utilsController.removeStudent);

// SUBJECT
const subjectController = require("../controller/utils/subject.controller");
router.get("/subject", subjectController.getSubjects);
router.post("/subject/create", authenticate, authorize(["admin"]), subjectController.createSubject);
router.patch("/subject/update", authenticate, authorize(["admin"]), subjectController.updateSubject);
router.delete("/subject/delete", authenticate, authorize(["admin"]), subjectController.deleteSubject);

// CLASSES
const classesController = require("../controller/utils/classes.controller");
router.get("/class", classesController.getClasses);
router.post("/class/create", authenticate, authorize(["admin"]), classesController.createClass);
router.patch("/class/update", authenticate, authorize(["admin"]), classesController.updateClass);
router.delete("/class/delete", authenticate, authorize(["admin"]), classesController.deleteClass);

// EXAM
const examController = require("../controller/utils/exam.controller");
router.get("/exam", examController.getExamData);
router.post("/exam/create", authenticate, authorize(["admin", "teacher"]), examController.createExam);
router.patch("/exam/update", authenticate, authorize(["admin", "teacher"]), examController.updateExam);
router.delete("/exam/delete", authenticate, authorize(["admin", "teacher"]), examController.deleteExam);

// LESSON
const lessonController = require("../controller/utils/lessons.controller");
router.get("/lesson", lessonController.getLessons);
router.post("/lesson/create", authenticate, authorize(["admin", "teacher"]), lessonController.createLesson);
router.patch("/lesson/update", authenticate, authorize(["admin", "teacher"]), lessonController.updateLesson);
router.delete("/lesson/delete", authenticate, authorize(["admin", "teacher"]), lessonController.deleteLesson);

// ASSIGNMENT
const assignmentController = require("../controller/utils/assignment.controller");
router.get("/assignment", assignmentController.getAssignments);
router.post("/assignment/create", authenticate, authorize(["admin", "teacher"]), assignmentController.createAssignment);
router.patch("/assignment/update", authenticate, authorize(["admin", "teacher"]), assignmentController.updateAssignment);
router.delete("/assignment/delete", authenticate, authorize(["admin", "teacher"]), assignmentController.deleteAssignment);

// RESULTS
const resultController = require("../controller/utils/result.controller");
router.get("/result", resultController.getResults);
router.post("/result/create", authenticate, authorize(["admin", "teacher"]), resultController.createResult);
router.patch("/result/update", authenticate, authorize(["admin", "teacher"]), resultController.updateResult);
router.delete("/result/delete", authenticate, authorize(["admin", "teacher"]), resultController.deleteResult);

// EVENTS
const eventController = require("../controller/utils/event.controller");
router.get("/event", eventController.getEvents);
router.post("/event/create", authenticate, authorize(["admin", "teacher"]), eventController.createEvent);
router.patch("/event/update", authenticate, authorize(["admin", "teacher"]), eventController.updateEvent);
router.delete("/event/delete", authenticate, authorize(["admin"]), eventController.deleteEvent);

// ANNOUNCEMENTS
const announcementController = require("../controller/utils/announcement.controller");
router.get("/announcement", announcementController.getAnnouncements);
router.post("/announcement/create", authenticate, authorize(["admin", "teacher"]), announcementController.createAnnouncement);
router.patch("/announcement/update", authenticate, authorize(["admin", "teacher"]), announcementController.updateAnnouncement);
router.delete("/announcement/delete", authenticate, authorize(["admin"]), announcementController.deleteAnnouncement);

// STATS
const statsController = require("../controller/utils/stats.controller");
router.get("/stats", statsController.getStats);
router.get("/admin/stats", statsController.getStats);

module.exports = router;
