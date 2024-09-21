const express = require('express');
const {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    enrollStudent,
    getStudentsInCourse
} = require('../controllers/courseController');
const { protect, teacher, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /api/courses
// @desc    Create a new course (only teachers and admins)
// @access  Private
router.post('/', protect, teacher, createCourse);

// @route   GET /api/courses
// @desc    Get all courses
// @access  Public
router.get('/', getAllCourses);

// @route   GET /api/courses/:id
// @desc    Get course by ID
// @access  Public
router.get('/:id', getCourseById);

// @route   PUT /api/courses/:id
// @desc    Update a course (only the course creator or admin)
// @access  Private
router.put('/:id', protect, teacher, updateCourse);

// @route   DELETE /api/courses/:id
// @desc    Delete a course (only the course creator or admin)
// @access  Private
router.delete('/:id', protect, teacher, admin, deleteCourse);

// @route   POST /api/courses/:id/enroll
// @desc    Enroll a student in a course
// @access  Private
router.post('/:id/enroll', protect, enrollStudent);

// @route   GET /api/courses/:id/students
// @desc    Get all students enrolled in a course
// @access  Private (only the course creator or admin)
router.get('/:id/students', protect, teacher, getStudentsInCourse);

module.exports = router;
