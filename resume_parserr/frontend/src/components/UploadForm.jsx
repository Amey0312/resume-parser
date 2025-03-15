import { useState } from 'react';

const UploadForm = ({ onUpload }) => {
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('resume', file);
        formData.append('jobDescription', jobDescription);
        
        const response = await fetch('http://localhost:5000/api/resumes/upload', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        onUpload();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <textarea placeholder="Job Description" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
            <button type="submit">Upload</button>
        </form>
    );
};
export default UploadForm;