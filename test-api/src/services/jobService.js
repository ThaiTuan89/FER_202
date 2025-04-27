// services/jobService.js
const API_URL = 'http://localhost:3001/jobs';

export const fetchJobs = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch jobs');
  return response.json();
};
