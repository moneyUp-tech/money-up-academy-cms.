const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private (Teachers & Admins)
const createCourse = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newCourse = new Course({
            title,
            description,
            teacher: req.user._id,
        });

        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('teacher', 'name email');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('teacher', 'name email');
        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private (Course Creator & Admins)
const updateCourse = async (req, res) => {
    try {
        const { title, description } = req.body;
        const course = await Course.findById(req.params.id);

        if (course) {
            // Check if the user is the course creator
            if (course.teacher.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(401).json({ message: 'Not authorized to update this course' });
            }

            course.title = title || course.title;
            course.description = description || course.description;
            const updatedCourse = await course.save();
            res.json(updatedCourse);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private (Course Creator & Admins)
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (course) {
            // Check if the user is the course creator
            if (course.teacher.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(401).json({ message: 'Not authorized to delete this course' });
            }

            await course.remove();
            res.json({ message: 'Course removed' });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Enroll a student in a course
// @route   POST /api/courses/:id/enroll
// @access  Private
const enrollStudent = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (course) {
            // Check if the student is already enrolled
            if (course.students.includes(req.user._id)) {
                return res.status(400).json({ message: 'Already enrolled in this course' });
            }

            course.students.push(req.user._id);
            await course.save();
            res.json({ message: 'Enrolled successfully' });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all students in a course
// @route   GET /api/courses/:id/students
// @access  Private (Course Creator & Admins)
const getStudentsInCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('students', 'name email');

        if (course) {
            // Check if the user is the course creator or admin
            if (course.teacher.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(401).json({ message: 'Not authorized to view students' });
            }

            res.json(course.students);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    enrollStudent,
    getStudentsInCourse,
};
