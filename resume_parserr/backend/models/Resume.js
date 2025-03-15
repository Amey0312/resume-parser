const mongoose = require('mongoose');
const ResumeSchema = new mongoose.Schema({
    filename: String,
    filepath: String,
    extractedText: String,
    score: Number,
    jobDescription: String,
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Resume', ResumeSchema);