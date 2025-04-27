// components/JobsList.js
import { useEffect, useState } from 'react';
import { fetchJobs } from '../services/jobService';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchJobs();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      }
    };
    loadJobs();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (jobs.length === 0) return <div>Loading...</div>;

  return (
    <ul>
  {jobs.map((job) => (
    <li key={job.id}>
      <strong>{job.title}</strong> - {job.company} ({job.location})<br />
      <strong>📄 Description: </strong>{job.description}<br />
      <strong>💼 Type: </strong>{job.employmentType}<br />
      <strong>💰 Salary: </strong>{job.salary.amount} {job.salary.currency}<br />
      <strong>🧠 Requirements: </strong>{job.requirements.join(', ')}<br />
      <strong>📅 Posted: </strong>{job.postedDate} | Deadline: {job.applicationDeadline}
    </li>
  ))}
</ul>

  );
};

export default JobsList;
