// components/JobTabs.js

import { useEffect, useState } from 'react';
import { Tabs, Tab, Form } from 'react-bootstrap';
import JobTable from './JobTable';

const JobTabs = ({ jobs, onEdit, onDelete }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [fullTimeJobs, setFullTimeJobs] = useState([]);
  const [partTimeJobs, setPartTimeJobs] = useState([]);
  const [highSalaryJobs, setHighSalaryJobs] = useState([]);
  const [mostRecentJob, setMostRecentJob] = useState(null);
  const [remoteJobs, setRemoteJobs] = useState([]);
  const [keywordJobs, setKeywordJobs] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (activeTab === "fullTime") {
      setFullTimeJobs(jobs.filter((job) => job.employmentType === "Full-Time"));
    } else if (activeTab === "partTime"){
      setPartTimeJobs(jobs.filter((job) => job.employmentType === "Part-Time"));
    } else if (activeTab === "highSalary") {
      setHighSalaryJobs(jobs.filter((job) => job.salary.amount >= 70000));
    } else if (activeTab === "recent") {
      const recent = jobs.reduce((latest, job) => {
        return new Date(job.postedDate) > new Date(latest.postedDate) ? job : latest;
      }, jobs[0]);
      setMostRecentJob(recent);
    } else if (activeTab === "remote") {
      setRemoteJobs(jobs.filter((job) => job.location === "Remote"));
    } else if (activeTab === "keyword" && keyword) {
      setKeywordJobs(
        jobs.filter((job) =>
          job.requirements.some((req) =>
            req.toLowerCase().includes(keyword.toLowerCase())
          )
        )
      );
    }
  }, [activeTab, keyword, jobs]);

  return (
    <Tabs
      activeKey={activeTab}
      onSelect={(key) => setActiveTab(key)}
      id="job-tabs"
      className="mb-3"
    >
      <Tab eventKey="all" title="All Jobs">
        <JobTable jobs={jobs} showActions onEdit={onEdit} onDelete={onDelete} />
      </Tab>

      <Tab eventKey="fullTime" title="Full-Time Jobs">
        <JobTable jobs={fullTimeJobs} />
      </Tab>

      <Tab eventKey="partTime" title="Part-Time Jobs">
        <JobTable jobs={partTimeJobs} />
      </Tab>

      <Tab eventKey="highSalary" title="High Salary Jobs (≥ 70000 USD)">
        <JobTable jobs={highSalaryJobs} />
      </Tab>

      <Tab eventKey="recent" title="Most Recent Job">
        <JobTable jobs={mostRecentJob ? [mostRecentJob] : []} />
      </Tab>

      <Tab eventKey="remote" title="Remote Jobs">
        <JobTable jobs={remoteJobs} />
      </Tab>

      <Tab eventKey="keyword" title="Keyword Jobs">
        <Form.Group className="d-flex align-items-center gap-2 mb-3">
          <Form.Control
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter keyword"
            style={{ width: '200px' }}
          />
        </Form.Group>
        <JobTable jobs={keywordJobs} />
      </Tab>
    </Tabs>
  );
};

export default JobTabs;
