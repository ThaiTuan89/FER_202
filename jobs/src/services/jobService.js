const API_URL = 'http://localhost:3001/jobs';

export const fetchJobs = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch jobs');
  return response.json();
};

export const addJob = async (job) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job),
  });
  if (!response.ok) throw new Error('Failed to add job');
  return job;
};

export const updateJob = async (id, updatedJob) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedJob),
  });
  if (!response.ok) throw new Error('Failed to update job');
  return updatedJob;
};

export const deleteJob = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete job');
  return id;
};
