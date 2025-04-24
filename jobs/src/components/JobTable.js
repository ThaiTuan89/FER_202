// components/JobTable.js

import { Table, Button } from 'react-bootstrap';
import { checkDeadlineStatus } from '../utils/helpers';

const JobTable = ({ jobs, showActions = false, onEdit, onDelete }) => {
  if (!jobs || jobs.length === 0) return <p>No jobs available.</p>;

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Job ID</th>
          <th>Title</th>
          <th>Company</th>
          <th>Location</th>
          <th>Description</th>
          <th>Requirements</th>
          <th>Salary</th>
          <th>Employment Type</th>
          <th>Posted Date</th>
          <th>Deadline</th>
          <th>Status</th>
          {showActions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr key={job.id}>
            <td>{job.jobId}</td>
            <td>{job.title}</td>
            <td>{job.company}</td>
            <td>{job.location}</td>
            <td>{job.description}</td>
            <td>{job.requirements.join(', ')}</td>
            <td>{job.salary.amount} {job.salary.currency}</td>
            <td>{job.employmentType}</td>
            <td>{job.postedDate}</td>
            <td>{job.applicationDeadline}</td>
            <td>{checkDeadlineStatus(job.applicationDeadline)}</td>
            {showActions && (
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => onEdit(job)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(job.id)}
                >
                  Delete
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default JobTable;
