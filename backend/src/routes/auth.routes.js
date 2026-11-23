const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.middleware');

// UNIFIED AUTH & SESSION
const authUnifiedController = require('../controller/auth/auth.unified.controller');
router.get('/session', authenticate, authUnifiedController.getSession);
router.post('/signIn', authUnifiedController.unifiedSignIn);
router.post('/signOut', authUnifiedController.unifiedSignOut);

// ADMIN
const authAdminController = require('../controller/auth/auth.admin.controller');
router.post('/admin/signUp', authAdminController.signUpAdmin);
router.post('/admin/signIn', authAdminController.signInAdmin);
router.post('/admin/signOut', authAdminController.signOutAdmin);

// TEACHER
const authTeacherController = require('../controller/auth/auth.teacher.controller');
router.post('/teacher/signUp', authTeacherController.signUpTeacher);
router.post('/teacher/signIn', authTeacherController.signInTeacher);
router.post('/teacher/signOut', authTeacherController.signOutTeacher);

// STUDENT
const authStudentController = require('../controller/auth/auth.student.controller');
router.post('/student/signUp', authStudentController.signUpStudent);
router.post('/student/signIn', authStudentController.signInStudent);
router.post('/student/signOut', authStudentController.signOutStudent);

// PARENT
const authParentController = require('../controller/auth/auth.parent.controller');
router.post('/parent/signUp', authParentController.signUpParent);
router.post('/parent/signIn', authParentController.signInParent);
router.post('/parent/signOut', authParentController.signOutParent);

module.exports = router;
