import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function SeekerDashboard() {
  const username = localStorage.getItem("username");
  const jobSeekerId = localStorage.getItem("jobSeekerId"); // must be stored at login/registration
  const token = localStorage.getItem("token");

  const [jobs, setJobs] = useState([]);

  // Fetch jobs dynamically
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5062/api/JobSeeker/SearchJobs?jobTitle=&location=&workMode=`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs", err);
      }
    };
    fetchJobs();
  }, [token]);

  // Apply to a job
  const handleApply = async (jobId) => {
  try {
    const payload = {
      jobId: jobId,
      jobSeekerId: jobSeekerId,
      applicantName: username,
      resumePath: "resume.pdf"
    };

    console.log("Applying Job Payload:", payload);

    const res = await axios.post(
      "http://localhost:5062/api/JobSeeker/ApplyJob",
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert(`Applied to job ${jobId} ✅\nStatus: ${res.data.status}`);
  } catch (err) {
    console.error("Error applying job", err.response?.data || err.message);
    alert("Failed to apply for job");
  }
};


  return (
    <div className="container mt-5">
      {/* Banner */}
      <div
        className="p-4 mb-4 text-white rounded"
        style={{ background: "linear-gradient(to right, #0d1b2a, #1b263b)" }}
      >
        <h2>Welcome, {username} 👋</h2>
        <p>Find your dream job and manage your applications easily.</p>
      </div>

      {/* Quick Actions */}
<div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
  <Link to="/jobs" className="btn btn-warning fw-bold px-4 py-2 shadow">
    Browse Jobs
  </Link>
  <Link to="/applications" className="btn btn-outline-dark fw-bold px-4 py-2 shadow">
    My Applications
  </Link>
  <Link to="/create-profile" className="btn btn-outline-dark fw-bold px-4 py-2 shadow">
    Create New Profile
  </Link>
  <Link to="/update-profile" className="btn btn-warning fw-bold px-4 py-2 shadow">
    Update Profile
  </Link>
  <Link to="/apply-job" className="btn btn-warning fw-bold px-4 py-2 shadow">
    Apply Job
  </Link>
</div>


  {/* /* Recommended Jobs  */}
<h4 className="mb-3">Recommended Jobs for You</h4>
<div className="row">
  {jobs.length > 0 ? (
    jobs.map((job) => (
      <div className="col-md-4 mb-3" key={job.jobId}>
        <div className="card shadow-sm p-3">
          <h5>{job.jobTitle}</h5>
          <p><strong>Company:</strong> ID {job.employerId}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Work Mode:</strong> {job.workMode}</p>
          <p><strong>Salary:</strong> {job.salaryRange}</p>
          <button
            className="btn btn-sm btn-warning w-100"
            onClick={async () => {
              try {
                const res = await axios.post(
                  "http://localhost:5062/api/JobSeeker/ApplyJob",
                  {
                    jobId: job.jobId,
                    jobSeekerId: parseInt(localStorage.getItem("jobSeekerId")), // from login
                    applicantName: localStorage.getItem("username"), // logged in user
                    resumePath: "resume.pdf" // dummy resume until file upload
                  },
                  { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
                );
                alert("✅ Application submitted successfully!");
              } catch (err) {
                console.error("Apply error:", err.response?.data || err.message);
                
              }
            }}
          >
           <Link
            to="/apply-job"
            className="btn btn-dark w-100 p-3 fw-bold rounded-3 shadow-sm"
          >
            Apply now
          </Link>
          </button>
        </div>
      </div>
    ))
  ) : (
    <p>No jobs found.</p>
  )}
</div>
</div>
  );
}

export default SeekerDashboard;
