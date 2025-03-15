import { useEffect, useState } from 'react';

const BestResume = () => {
    const [bestResume, setBestResume] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/resumes/best')
            .then(res => res.json())
            .then(data => setBestResume(data));
    }, []);

    if (!bestResume) return <p>Loading best resume...</p>;

    return (
        <div>
            <h2>Best Matching Resume</h2>
            <p><strong>Filename:</strong> {bestResume.filename}</p>
            <p><strong>Score:</strong> {bestResume.score}%</p>
            <p><strong>Job Description:</strong> {bestResume.jobDescription}</p>
        </div>
    );
};
export default BestResume;
