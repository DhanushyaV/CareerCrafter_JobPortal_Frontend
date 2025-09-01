// src/pages/Jobseekers/SearchJobs.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function SearchJobs() {
  const token = localStorage.getItem("token");
  const jobSeekerId = localStorage.getItem("jobSeekerId");

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // filters
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [workMode, setWorkMode] = useState("");

  // Fetch jobs from API
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5062/api/JobSeeker/SearchJobs", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          jobTitle: jobTitle || undefined,
          location: location || undefined,
          workMode: workMode || undefined,
        },
      });
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs", err);
      alert("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  // Run first time with no filters (all jobs)
  useEffect(() => {
    fetchJobs();
  }, []);

  // Apply to a job
  const handleApply = async (jobId) => {
    if (!jobSeekerId) {
      alert("You must be logged in as JobSeeker to apply.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5062/api/JobSeeker/ApplyJob",
        { jobId: parseInt(jobId), jobSeekerId: parseInt(jobSeekerId) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Application submitted successfully!");
    } catch (err) {
      console.error("Error applying to job", err);
      alert("Failed to apply. You may have already applied.");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Browse Jobs</h3>

      {/* Search Filters */}
      <div className="card shadow p-3 mb-4">
        <div className="row g-2">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-control"
              value={workMode}
              onChange={(e) => setWorkMode(e.target.value)}
            >
              <option value="">Work Mode</option>
              <option value="Remote">Remote</option>
              <option value="Onsite">Onsite</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="col-md-3">
            <button onClick={fetchJobs} className="btn btn-warning w-100 fw-bold">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <div className="row">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div className="col-md-4 mb-3" key={job.jobId}>
                <div className="card shadow-sm p-3">
                  <h5 className="fw-bold">{job.jobTitle}</h5>
                  <p className="text-muted">{job.description}</p>
                  <p><strong>Location:</strong> {job.location}</p>
                  <p><strong>Work Mode:</strong> {job.workMode}</p>
                  <p><strong>Salary:</strong> {job.salaryRange}</p>
                  <p>
                    <small>
                      Posted: {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : "N/A"}
                    </small>
                  </p>
                  <button
                    onClick={() => handleApply(job.jobId)}
                    className="btn btn-warning fw-bold w-100"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <h5>No jobs found</h5>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchJobs;
