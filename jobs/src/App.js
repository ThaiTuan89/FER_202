import Jobs from './components/Jobs';
import React from 'react';
import { JobsProvider } from './context/JobsContext';

function App() {
  return (
    <JobsProvider>
    <Jobs />
  </JobsProvider>
  );
}

export default App;