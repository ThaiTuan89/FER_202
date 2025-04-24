// pages/Jobs.js

import { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import JobForm from '../components/JobForm';
import JobTabs from '../components/JobTabs';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { useJobs } from '../context/JobsContext';
import { addJob, updateJob, deleteJob } from '../services/jobService';

const Jobs = () => {
  const { jobs, dispatch, loading, error, setError } = useJobs();
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleAddJob = async (job) => {
    try {
      const newJob = { ...job, id: Date.now().toString() };
      await addJob(newJob);
      dispatch({ type: 'ADD_JOB', payload: newJob });
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateJob = async (job) => {
    try {
      await updateJob(editingJob.id, job);
      dispatch({ type: 'UPDATE_JOB', payload: { ...job, id: editingJob.id } });
      setEditingJob(null);
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteJob(deleteId);
      dispatch({ type: 'DELETE_JOB', payload: deleteId });
      setShowModal(false);
      setDeleteId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (error) return (
    <div>
      Error: {error}
      <Button variant="secondary" className="ms-2" onClick={() => setError(null)}>
        Clear Error
      </Button>
    </div>
  );

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Jobs Management</h2>

      <div className="mb-4">
        <Button onClick={() => {
          setShowForm(true);
          setEditingJob(null);
        }}>
          Add Job
        </Button>
      </div>

      {showForm && (
        <JobForm
          onSubmit={editingJob ? handleUpdateJob : handleAddJob}
          onCancel={() => {
            setEditingJob(null);
            setShowForm(false);
          }}
          editingJob={editingJob}
        />
      )}

      <JobTabs jobs={jobs} onEdit={handleEdit} onDelete={handleDelete} />

      <ConfirmDeleteModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />
    </Container>
  );
};

export default Jobs;
