import { useEffect, useState } from 'react';

const ResumeList = () => {
    const [resumes, setResumes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/resumes/resumes')
            .then(res => res.json())
            .then(data => setResumes(data));
    }, []);

    return (
        <ul>
            {resumes.map(resume => (
                <li key={resume._id}>{resume.filename} - Score: {resume.score}%</li>
            ))}
        </ul>
    );
};
export default ResumeList;