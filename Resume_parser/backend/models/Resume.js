const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    filename: String,
    content: String,
    score: Number, // Similarity score
    jobDescription: String, // Store related job description
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);
