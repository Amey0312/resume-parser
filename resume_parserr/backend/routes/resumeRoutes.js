const express = require('express');
const router = express.Router();
const { upload, uploadResume, getResumes, getBestResume } = require('../controllers/resumeController');

router.post('/upload', upload.single('resume'), uploadResume);
router.get('/resumes', getResumes);
router.get('/best', getBestResume);

module.exports = router;
