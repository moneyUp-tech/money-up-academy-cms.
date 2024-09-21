const express = require('express');
const { issueCertificate, getCertificatesByStudent } = require('../controllers/certificateController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/issue', protect, issueCertificate);
router.get('/student/:studentId', protect, getCertificatesByStudent);

module.exports = router;
