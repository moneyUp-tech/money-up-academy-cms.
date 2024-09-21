const Certificate = require('../models/Certificate');
const Course = require('../models/Course');
const User = require('../models/User');

// Issue a certificate to a student for a course
const issueCertificate = async (req, res) => {
    const { courseId, studentId } = req.body;

    const course = await Course.findById(courseId);
    const student = await User.findById(studentId);

    if (!course || !student) {
        return res.status(404).json({ message: 'Course or student not found' });
    }

    const certificate = new Certificate({
        course: courseId,
        student: studentId,
        certificateUrl: `https://yourdomain.com/certificates/${studentId}_${courseId}.pdf`, // Generate URL dynamically
    });

    await certificate.save();
    res.status(201).json(certificate);
};

// Retrieve all certificates for a student
const getCertificatesByStudent = async (req, res) => {
    const studentId = req.params.studentId;

    const certificates = await Certificate.find({ student: studentId }).populate('course');
    res.json(certificates);
};

module.exports = { issueCertificate, getCertificatesByStudent };
