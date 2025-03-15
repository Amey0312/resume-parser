// const Resume = require('../models/Resume');
// const { extractTextFromPDF, evaluateResumes } = require('../utils/evaluator');

// // // Upload resumes
// exports.uploadResume = async (req, res) => {
//     try {
//       if (!req.files || req.files.length === 0) {
//         return res.status(400).json({ message: "No files uploaded!" });
//       }
  
//       console.log("Uploaded files:", req.files);
  
//       const resumeDocs = await Promise.all(req.files.map(async (file) => {
//         try {
//           const extractedText = await extractTextFromPDF(file.path);
  
//           return Resume.create({
//             filename: file.filename,
//             filepath: file.path,
//             extractedText
//           });
  
//         } catch (error) {
//           console.error(`Error processing ${file.filename}:`, error.message);
//           throw new Error(error.message);
//         }
//       }));
  
//       res.json({ message: "Resumes uploaded successfully!", resumes: resumeDocs });
  
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   };
  

// // exports.uploadResumes = async (req, res) => {
// //     try {
// //       if (!req.files || req.files.length === 0) {
// //         return res.status(400).json({ message: "No files uploaded!" });
// //       }
  
// //       console.log("Uploaded files:", req.files);
  
// //       const resumeDocs = await Promise.all(req.files.map(async (file) => {
// //         try {
// //           const { text, applicantName, email, phoneNumber, skills } = await extractTextFromPDF(file.path);
  
// //           return Resume.create({
// //             filename: file.filename,
// //             filepath: file.path,
// //             extractedText: text,
// //             applicantName,
// //             email,
// //             phoneNumber,
// //             skills,
// //           });
  
// //         } catch (error) {
// //           console.error(`Error processing ${file.filename}:`, error.message);
// //           throw new Error(error.message);
// //         }
// //       }));
  
// //       res.json({ message: "Resumes uploaded successfully!", resumes: resumeDocs });
  
// //     } catch (error) {
// //       res.status(400).json({ message: error.message });
// //     }
// //   };


// // Get all resumes
// exports.getResumes = async (req, res) => {
//     try {
//       const resumes = await Resume.find().sort({ uploadedAt: -1 });
//       res.json(resumes);
//     } catch (error) {
//       res.status(500).json({ message: "Failed to fetch resumes", error: error.message });
//     }
//   };
  

// // Evaluate resumes
// exports.evaluateResumes = async (req, res) => {
//   const { jobDescription } = req.body;
//   const resumes = await Resume.find();
//   const rankedResumes = evaluateResumes(jobDescription, resumes);
//   res.json({ rankedResumes });
// };

const Resume = require('../models/Resume');
const evaluateResume = require('../utils/evaluator');
const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse');

const storage = multer.diskStorage({
    destination: './backend/uploads/',
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

const uploadResume = async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ message: 'No file uploaded' });

        const dataBuffer = fs.readFileSync(file.path);
        const pdfData = await pdfParse(dataBuffer);

        const jobDescription = req.body.jobDescription || '';
        const score = evaluateResume(pdfData.text, jobDescription);

        const newResume = new Resume({ filename: file.filename, filepath: file.path, extractedText: pdfData.text, score, jobDescription });
        await newResume.save();

        res.json({ message: 'Resume uploaded', resume: newResume });
    } catch (error) {
        res.status(500).json({ message: 'Error processing resume', error });
    }
};

const getResumes = async (req, res) => {
    const resumes = await Resume.find().sort({ score: -1 });
    res.json(resumes);
};

const getBestResume = async (req, res) => {
    const bestResume = await Resume.findOne().sort({ score: -1 });
    if (bestResume) {
        res.json(bestResume);
    } else {
        res.status(404).json({ message: 'No resumes found' });
    }
};

module.exports = { upload, uploadResume, getResumes, getBestResume };
