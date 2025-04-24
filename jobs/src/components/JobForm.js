// components/JobForm.js

import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const initialJobState = {
  jobId: "",
  title: "",
  company: "",
  location: "",
  description: "",
  requirements: "",
  salary: { currency: "USD", amount: 0 },
  employmentType: "Full-Time",
  postedDate: new Date().toISOString().split("T")[0],
  applicationDeadline: "",
};

const JobForm = ({ onSubmit, onCancel, editingJob }) => {
  const [job, setJob] = useState(initialJobState);

  useEffect(() => {
    if (editingJob) {
      setJob({
        ...editingJob,
        requirements: editingJob.requirements.join(', '),
      });
    } else {
      setJob(initialJobState);
    }
  }, [editingJob]);

  const handleChange = (field, value) => {
    if (field.startsWith("salary.")) {
      const salaryField = field.split(".")[1];
      setJob({ ...job, salary: { ...job.salary, [salaryField]: value } });
    } else {
      setJob({ ...job, [field]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedJob = {
      ...job,
      salary: {
        currency: job.salary.currency,
        amount: parseInt(job.salary.amount) || 0,
      },
      requirements: job.requirements
        .split(',')
        .map((req) => req.trim())
        .filter((req) => req),
    };
    onSubmit(formattedJob);
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group className="mb-3">
        <Form.Label>Job ID</Form.Label>
        <Form.Control
          type="text"
          value={job.jobId}
          onChange={(e) => handleChange("jobId", e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={job.title}
          onChange={(e) => handleChange("title", e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Company</Form.Label>
        <Form.Control
          type="text"
          value={job.company}
          onChange={(e) => handleChange("company", e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          value={job.location}
          onChange={(e) => handleChange("location", e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={job.description}
          onChange={(e) => handleChange("description", e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Requirements (comma separated)</Form.Label>
        <Form.Control
          type="text"
          value={job.requirements}
          onChange={(e) => handleChange("requirements", e.target.value)}
          placeholder="e.g., JavaScript, React"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Salary Amount</Form.Label>
        <Form.Control
          type="number"
          value={job.salary.amount}
          onChange={(e) => handleChange("salary.amount", e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Currency</Form.Label>
        <Form.Control
          type="text"
          value={job.salary.currency}
          onChange={(e) => handleChange("salary.currency", e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Employment Type</Form.Label>
        <Form.Control
          as="select"
          value={job.employmentType}
          onChange={(e) => handleChange("employmentType", e.target.value)}
          required
        >
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Contract">Contract</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Posted Date</Form.Label>
        <Form.Control
          type="date"
          value={job.postedDate}
          onChange={(e) => handleChange("postedDate", e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Application Deadline</Form.Label>
        <Form.Control
          type="date"
          value={job.applicationDeadline}
          onChange={(e) => handleChange("applicationDeadline", e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {editingJob ? 'Save' : 'Add'}
      </Button>
      <Button variant="secondary" className="ms-2" onClick={onCancel}>
        Cancel
      </Button>
    </Form>
  );
};

export default JobForm;
