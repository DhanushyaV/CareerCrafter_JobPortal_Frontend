import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ManageJobs() {
  const employerId = localStorage.getItem("employerId");
  const token = localStorage.getItem("token");

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5062/api/Employer/${employerId}/JobListings`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs", err);
      }
    };
    fetchJobs();
  }, [employerId, token]);

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await axios.delete(`http://localhost:5062/api/Employer/DeleteJob/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(jobs.filter((j) => j.jobId !== jobId));
      alert("Job deleted successfully!");
    } catch (err) {
      console.error("Error deleting job", err);
      alert("Failed to delete job");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Manage My Jobs</h3>
      <div className="row">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div className="col-md-4 mb-3" key={job.jobId}>
              <div className="card shadow-sm p-3">
                <h5 className="fw-bold">{job.jobTitle}</h5>
                <p className="text-muted">{job.description || job.jobDescription}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salaryRange}</p>
                <div className="d-flex gap-2">
                  <Link to={`/update-job/${job.jobId}`} className="btn btn-sm btn-dark">
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(job.jobId)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                  <Link to={`/applications/${job.jobId}`} className="btn btn-sm btn-warning">
                    Applications
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No jobs found. Post one first!</p>
        )}
      </div>
    </div>
  );
}

export default ManageJobs;
