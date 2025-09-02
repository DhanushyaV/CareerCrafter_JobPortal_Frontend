import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function SeekerDashboard() {
  const username = localStorage.getItem("username");
  const jobSeekerId = localStorage.getItem("jobSeekerId");
  const token = localStorage.getItem("token");

  const [jobs, setJobs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  // ✅ Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5062/api/JobSeeker/${jobSeekerId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };
    fetchProfile();
  }, [jobSeekerId, token]);

  // ✅ Fetch jobs dynamically
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

  // ✅ Apply to a job
  const handleApply = async (jobId) => {
    try {
      const payload = {
        jobId: jobId,
        jobSeekerId: jobSeekerId,
        applicantName: username,
        resumePath: "resume.pdf",
      };

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
      {/* Sidebar Profile (slides in/out) */}
      <div
        className={`position-fixed top-0 start-0 h-100 bg-white shadow p-4`}
        style={{
          width: "350px",
          transform: showProfile ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
          zIndex: 1050,
          overflowY: "auto",
        }}
      >
        {/* Close Button */}
        <button
          className="btn-close position-absolute top-0 end-0 m-3"
          onClick={() => setShowProfile(false)}
        ></button>

        {profile ? (
          <>
            <div className="text-center">
              <div
                className="rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ width: "100px", height: "100px", fontSize: "36px" }}
              >
                {profile.fullName?.charAt(0) || "👤"}
              </div>
              <h5 className="fw-bold">{profile.fullName}</h5>
              <p className="text-muted">{profile.email}</p>
              <p>{profile.phoneNumber}</p>
              <p>{profile.address}</p>
              {profile.resumePath && (
                <a
                  href={profile.resumePath}
                  className="btn btn-sm btn-outline-dark mt-2"
                  target="_blank"
                  rel="noreferrer"
                >
                  View Resume
                </a>
              )}
            </div>
            <hr />
            <h6 className="fw-bold">About Me</h6>
            <p className="text-muted">{profile.summary}</p>

            <h6 className="fw-bold mt-3">🎓 Education</h6>
            {profile.qualifications?.map((q, i) => (
              <p key={i}>
                <strong>{q.degreeName}</strong>, {q.specialization}
                <br />
                {q.institutionName} ({q.graduationYear})
              </p>
            ))}

            <h6 className="fw-bold mt-3">💼 Work Experience</h6>
            {profile.workExperiences?.map((w, i) => (
              <p key={i}>
                <strong>{w.jobTitle}</strong> at {w.companyName}
                <br />
                {w.location} ({new Date(w.startDate).getFullYear()} -{" "}
                {w.endDate ? new Date(w.endDate).getFullYear() : "Present"})
              </p>
            ))}

            <h6 className="fw-bold mt-3">🛠 Skills</h6>
            <div className="d-flex flex-wrap gap-2">
              {profile.skills?.map((s, i) => (
                <span key={i} className="badge bg-dark">
                  {s.skillName}
                </span>
              ))}
            </div>
          </>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>

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
        <button
          onClick={() => setShowProfile(true)}
          className="btn btn-outline-dark fw-bold px-4 py-2 shadow"
        >
          My Profile
        </button>
        <Link to="/jobs" className="btn btn-warning fw-bold px-4 py-2 shadow">
          Browse Jobs
        </Link>
        <Link to="/applications" className="btn btn-outline-dark fw-bold px-4 py-2 shadow">
          My Applications
        </Link>
        <Link to="/create-profile" className="btn btn-outline-dark fw-bold px-4 py-2 shadow">
          Create New Profile
        </Link>
        <Link to="/update-profile" className="btn btn-outline-dark fw-bold px-4 py-2 shadow">
          Update Profile
        </Link>
        <Link to="/apply-job" className="btn btn-outline-dark fw-bold px-4 py-2 shadow">
          Apply Job
        </Link>
        <Link to="/paginated-job-search" className="btn btn-warning fw-bold px-4 py-2 shadow">
          🔍 Paginated Job Search
        </Link>
      </div>

      {/* Recommended Jobs */}
      <h4 className="mb-3">Recommended Jobs for You</h4>
      <div className="row">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div className="col-md-4 mb-3" key={job.jobId}>
              <div className="card shadow-sm p-3 h-100">
                <h5>{job.jobTitle}</h5>
                <p><strong>Company:</strong> ID {job.employerId}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Work Mode:</strong> {job.workMode}</p>
                <p><strong>Salary:</strong> {job.salaryRange}</p>
                <Link
  to="/apply-job"
  className="btn btn-warning fw-bold px-4 py-2 shadow w-100"
>
  Apply Now
</Link>
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
