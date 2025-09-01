import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function EmployerDashboard() {
  const username = localStorage.getItem("username");
  const employerId = localStorage.getItem("employerId"); // logged-in employer
  const token = localStorage.getItem("token");

  const [jobs, setJobs] = useState([]);        // jobs list (both self + search)
  const [profile, setProfile] = useState(null); // employer profile
  const [inputId, setInputId] = useState("");  // manual EmployerId search

  // Fetch jobs for logged-in employer initially
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5062/api/Employer/${employerId}/JobListings`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setJobs(response.data);
      } catch (err) {
        console.error("Error fetching jobs", err);
      }
    };
    fetchJobs();
  }, [employerId, token]);

  // Get Employer Profile
  const handleGetProfile = async () => {
    const targetId = inputId || employerId; // default to logged-in
    try {
      const res = await axios.get(
        `http://localhost:5062/api/Employer/${targetId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(res.data);
    } catch (err) {
      console.error("Error fetching profile", err);
      alert("Failed to load employer profile");
    }
  };

  // Get Job Listings by EmployerId
  const handleGetJobListings = async () => {
    const targetId = inputId || employerId; // default to logged-in
    try {
      const res = await axios.get(
        `http://localhost:5062/api/Employer/${targetId}/JobListings`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching job listings", err);
      alert("Failed to load job listings");
    }
  };

  return (
    <div className="container mt-4">
      {/* Banner */}
      <div
        className="p-4 mb-4 text-white rounded"
        style={{ background: "linear-gradient(to right, #ff8c00, #e65c00)" }}
      >
        <h2>Welcome, {username} 👋</h2>
        <p>Post jobs and manage your applicants easily.</p>
      </div>

      {/* Quick Actions */}
      <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
        <Link to="/post-job" className="btn btn-warning fw-bold px-4 py-2 shadow">
          Post Job
        </Link>
        <Link to="/manage-jobs" className="btn btn-dark fw-bold px-4 py-2 shadow">
          Manage Jobs
        </Link>
        <Link to="/view-applications" className="btn btn-dark fw-bold px-4 py-2 shadow">
  View Applications
</Link>

      </div>

      {/* Employer Profile Fetch */}
      <div className="card shadow p-3 mb-4">
        <h5 className="mb-3">Get Employer Profile</h5>
        <div className="d-flex gap-2">
          <input
            type="number"
            placeholder="Enter Employer ID (leave blank for self)"
            className="form-control"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
          />
          <button onClick={handleGetProfile} className="btn btn-info fw-bold">
            Get Profile
          </button>
        </div>
      </div>

      {/* Employer Profile Display */}
      {profile && (
        <div className="card shadow p-4 mb-4">
          <h4 className="mb-3">Employer Profile</h4>
          <p><strong>EmployerID:</strong> {profile.employerId}</p>
          <p><strong>CompanyName:</strong> {profile.companyName}</p>
          <p><strong>Message:</strong> {profile.message}</p>
        </div>
      )}

      {/* Employer Job Listings Fetch */}
      <div className="card shadow p-3 mb-4">
        <h5 className="mb-3">Get Job Listings By EmployerId</h5>
        <div className="d-flex gap-2">
          <input
            type="number"
            placeholder="Enter Employer ID (leave blank for self)"
            className="form-control"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
          />
          <button onClick={handleGetJobListings} className="btn btn-secondary fw-bold">
            Get Job Listings
          </button>
        </div>
      </div>

      {/* Jobs Section */}
      <h4 className="mb-3">Job Listings</h4>
      <div className="row">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div className="col-md-4 mb-3" key={job.jobId}>
              <div className="card shadow-sm p-3">
                <h5 className="fw-bold">{job.jobTitle}</h5>
                <p className="text-muted">{job.description || job.jobDescription}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salaryRange}</p>
                <p>
                  <small>
                    Posted on:{" "}
                    {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : "N/A"}
                  </small>
                </p>
                <div className="d-flex gap-2">
                  <Link to={`/applications/${job.jobId}`} className="btn btn-sm btn-warning">
                    View Applications
                  </Link>
                  <Link to={`/update-job/${job.jobId}`} className="btn btn-sm btn-dark">
                    Update
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <div className="card shadow-sm p-4">
              <h5>No jobs available</h5>
              <Link to="/post-job" className="btn btn-warning fw-bold mt-2">
                + Post Your First Job
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployerDashboard;
