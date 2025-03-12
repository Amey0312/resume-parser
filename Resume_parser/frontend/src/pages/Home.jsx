import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [jobDescription, setJobDescription] = useState('');
  const [resumes, setResumes] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('jobDescription', jobDescription);
    resumes.forEach((file) => formData.append('resumes', file)); // append each file

    try {
      const response = await axios.post('http://localhost:5000/api/resumes/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data);
      setResult(response.data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Resume Evaluator</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Enter Job Description..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={4}
          className="w-full border rounded p-2"
          required
        />

        <input
          type="file"
          multiple
          accept="application/pdf"
          onChange={(e) => setResumes([...e.target.files])} // Convert to array
          className="w-full border rounded p-2"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Evaluating...' : 'Upload & Evaluate'}
        </button>
      </form>

      {result && (
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">Results</h2>
          {result.results.map((res, idx) => (
            <div key={idx} className={`p-4 border rounded ${res.filename === result.bestMatch.filename ? 'bg-green-100' : ''}`}>
              <h3 className="font-bold">{res.filename}</h3>
              <p>Score: {res.score.toFixed(2)}%</p>
              {res.filename === result.bestMatch.filename && <p className="text-green-700">Best Match ✅</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
