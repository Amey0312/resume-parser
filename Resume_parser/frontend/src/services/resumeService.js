import axios from 'axios';

const API_URL = 'http://localhost:5000/api/resumes';

export const uploadResumes = async (jobDescription, files) => {
  const formData = new FormData();
  formData.append('jobDescription', jobDescription);
  for (const file of files) {
    formData.append('resumes', file);
  }

  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const fetchResumesByJobDescription = async (jobDescription) => {
  const response = await axios.get(`${API_URL}/job?jd=${encodeURIComponent(jobDescription)}`);
  return response.data;
};
