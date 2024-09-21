const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    issueDate: { type: Date, default: Date.now },
    certificateUrl: { type: String }, // URL of the generated certificate
});

const Certificate = mongoose.model('Certificate', certificateSchema);
module.exports = Certificate;
