const express = require('express');
const { getAdminDashboard, getTeacherDashboard, getStudentDashboard } = require('../controllers/dashboardController');
const { protect, admin, teacher, student } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/admin', protect, admin, getAdminDashboard);
router.get('/teacher', protect, teacher, getTeacherDashboard);
router.get('/student', protect, student, getStudentDashboard);

module.exports = router;
