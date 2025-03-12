const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const Resume = require('../models/Resume');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Function to calculate similarity (simple ratio of common words)
const calculateSimilarity = (text1, text2) => {
  const set1 = new Set(text1.toLowerCase().split(/\s+/));
  const set2 = new Set(text2.toLowerCase().split(/\s+/));
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  return (intersection.size / Math.max(set1.size, set2.size)) * 100; // Percentage
};

// Upload and evaluate resumes
// router.post('/upload', upload.array('resumes'), async (req, res) => {
//   const jobDescription = req.body.jobDescription;
//   const files = req.files;

//   if (!jobDescription || !files.length) {
//     return res.status(400).json({ message: 'Job description and resumes are required.' });
//   }

//   let evaluatedResumes = [];

//   for (const file of files) {
//     try {
//       const pdfText = await pdfParse(file.buffer);
//       const score = calculateSimilarity(jobDescription, pdfText.text);

//       const resume = new Resume({
//         filename: file.originalname,
//         content: pdfText.text,
//         jobDescription,
//         score
//       });

//       await resume.save();

//       evaluatedResumes.push({
//         filename: file.originalname,
//         score
//       });
//     } catch (err) {
//       console.error(`Error processing ${file.originalname}:`, err.message);
//     }
//   }

//   // Find best match
//   const bestMatch = evaluatedResumes.reduce((prev, curr) => (curr.score > prev.score ? curr : prev), { score: 0 });

//   res.json({ results: evaluatedResumes, bestMatch });
// });

router.post('/upload', upload.array('resumes'), async (req, res) => {
    const jobDescription = req.body.jobDescription;
    const files = req.files;
  
    if (!jobDescription || !files.length) {
      return res.status(400).json({ message: 'Job description and resumes are required.' });
    }
  
    let evaluatedResumes = [];
  
    for (const file of files) {
      try {
        const pdfText = await pdfParse(file.buffer);
        const score = calculateSimilarity(jobDescription, pdfText.text);
  
        const resume = new Resume({
          filename: file.originalname,
          content: pdfText.text,
          jobDescription,
          score
        });
  
        await resume.save();
  
        evaluatedResumes.push({ filename: file.originalname, score });
      } catch (err) {
        console.error(`Error processing ${file.originalname}:`, err.message);
      }
    }
  
    const bestMatch = evaluatedResumes.reduce((prev, curr) => (curr.score > prev.score ? curr : prev), { score: 0 });
  
    res.json({ results: evaluatedResumes, bestMatch });
  });
  

// Fetch resumes for a specific job description
router.get('/job', async (req, res) => {
  const jobDescription = req.query.jd;
  const resumes = await Resume.find({ jobDescription }).sort({ score: -1 });
  res.json(resumes);
});

module.exports = router;
