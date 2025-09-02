import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaGlobe,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
} from "react-icons/fa";

function EmployerDashboard() {
  const username = localStorage.getItem("username");
  const employerId = localStorage.getItem("employerId");
  const token = localStorage.getItem("token");

  const [jobs, setJobs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [inputId, setInputId] = useState("");

  // Fetch profile automatically for logged-in employer
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5062/api/Employer/${employerId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };
    fetchProfile();
  }, [employerId, token]);

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

  // Get Employer Profile manually (self or others)
  const handleGetProfile = async () => {
    const targetId = inputId || employerId;
    try {
      const res = await axios.get(
        `http://localhost:5062/api/Employer/${targetId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(res.data);
    } catch (err) {
      console.error("Error fetching profile", err);
      alert("employer profile not found");
    }
  };

  // Get Job Listings by EmployerId
  const handleGetJobListings = async () => {
    const targetId = inputId || employerId;
    try {
      const res = await axios.get(
        `http://localhost:5062/api/Employer/${targetId}/JobListings`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching job listings", err);
      alert("joblising not found");
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
        <div className="card shadow mb-4 border-0">
          {/* Banner */}
          <div
            style={{
              height: "120px",
              background: "linear-gradient(to right, #4facfe, #00f2fe)",
              borderTopLeftRadius: "0.5rem",
              borderTopRightRadius: "0.5rem",
            }}
          ></div>

          <div className="card-body text-center" style={{ marginTop: "-60px" }}>
            {/* Company Logo Circle */}
            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto shadow"
              style={{ width: "100px", height: "100px", fontSize: "36px" }}
            >
              {profile.companyName?.charAt(0) || <FaBuilding />}
            </div>

            {/* Company Info */}
            <h3 className="mt-3 fw-bold">{profile.companyName}</h3>
            <p className="text-muted">
              {profile.companyDescription || "Company details not provided."}
            </p>

            <div className="text-start mt-4 px-3">
              <p><strong>Employer ID:</strong> {profile.employerId}</p>
              <p><strong>Full Name:</strong> {profile.fullName}</p>
              <p><FaEnvelope className="me-2 text-secondary"/> {profile.email}</p>
              {profile.website && (
                <p>
                  <FaGlobe className="me-2 text-secondary"/>
                  <a href={profile.website} target="_blank" rel="noreferrer">{profile.website}</a>
                </p>
              )}
              <p><FaEnvelope className="me-2 text-secondary"/> {profile.contactEmail}</p>
              <p><FaPhone className="me-2 text-secondary"/> {profile.contactPhone}</p>
              <p><FaMapMarkerAlt className="me-2 text-secondary"/> {profile.address}</p>
            </div>
          </div>
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
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="fw-bold">{job.jobTitle}</h5>
                  <p className="text-muted">{job.description || job.jobDescription}</p>
                  <p><FaMapMarkerAlt className="me-2"/> {job.location}</p>
                  <p><FaPhone className="me-2"/> {job.salaryRange}</p>
                  <p>
                    <small className="text-muted">
                      Posted on: {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : "N/A"}
                    </small>
                  </p>
                  <div className="mt-auto d-flex gap-2">
                    <Link to={`/applications/${job.jobId}`} className="btn btn-sm btn-warning">
                      View Applications
                    </Link>
                    <Link to={`/update-job/${job.jobId}`} className="btn btn-sm btn-dark">
                      Update
                    </Link>
                  </div>
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
