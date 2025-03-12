const natural = require('natural');

const cosineSimilarity = (resumeText, jobDescription) => {
    const tfidf = new natural.TfIdf();
    tfidf.addDocument(resumeText);
    tfidf.addDocument(jobDescription);

    let score = 0;
    tfidf.tfidfs(jobDescription, (i, measure) => {
        if (i === 0) score = measure;
    });
    return score;
};

module.exports = { cosineSimilarity };
