// context/JobsContext.js

import { createContext, useReducer, useContext, useEffect, useState } from 'react';
import { jobsReducer } from '../reducers/jobsReducer';
import { fetchJobs } from '../services/jobService';

const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const [jobs, dispatch] = useReducer(jobsReducer, []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchJobs();
        dispatch({ type: 'SET_JOBS', payload: data });
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  return (
    <JobsContext.Provider value={{ jobs, dispatch, loading, error, setError }}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => useContext(JobsContext);
