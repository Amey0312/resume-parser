// const pdfParse = require('pdf-parse');
// const PDFParser = require("pdf2json");
// const fs = require('fs');


// exports.extractTextFromPDF = async (filePath) => {
//     return new Promise((resolve, reject) => {
//       let pdfParser = new PDFParser();
  
//       pdfParser.on("pdfParser_dataError", (errData) => {
//         console.error("PDF Parsing Error:", errData.parserError);
//         reject(new Error("Failed to process PDF. The structure might be incorrect."));
//       });
  
//       pdfParser.on("pdfParser_dataReady", (pdfData) => {
//         let text = pdfParser.getRawTextContent().trim();
  
//         // If text is too short, assume the PDF is not properly structured
//         if (text.length < 50) {
//           return reject(new Error("Resume PDF structure is not proper. Please upload a valid structured resume."));
//         }
  
//         resolve(text);
//       });
  
//       pdfParser.loadPDF(filePath);
//     });
//   };

//   exports.evaluateResumes = (jobDescription, resumes) => {
//     const keywords = jobDescription.toLowerCase().split(/\W+/);
  
//     const ranked = resumes.map(resume => {
//       const text = resume.extractedText.toLowerCase();
//       let score = 0;
//       keywords.forEach(keyword => {
//         if (text.includes(keyword)) score += 1;
//       });
//       return { resume, score };
//     });
  
//     return ranked.sort((a, b) => b.score - a.score);
//   };


const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

const evaluateResume = (resumeText, jobDescription) => {
    const resumeTokens = new Set(tokenizer.tokenize(resumeText.toLowerCase()));
    const jobTokens = new Set(tokenizer.tokenize(jobDescription.toLowerCase()));
    
    const matchedTokens = [...resumeTokens].filter(token => jobTokens.has(token));
    const score = (matchedTokens.length / jobTokens.size) * 100;
    return score.toFixed(2);
};
module.exports = evaluateResume;