import React, { useState } from "react";
import axios from "axios";

function ApplyJob() {
  const token = localStorage.getItem("token");
  const jobSeekerId = localStorage.getItem("jobSeekerId"); // save this during login
  const [form, setForm] = useState({
    jobId: "",
    jobSeekerId: jobSeekerId || "",
    applicantName: "",
    resumePath: "",
  });

  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5062/api/JobSeeker/ApplyJob",
        {
          jobId: parseInt(form.jobId),
          jobSeekerId: parseInt(form.jobSeekerId),
          applicantName: form.applicantName,
          resumePath: form.resumePath,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setResponse(res.data);
      alert("✅ Application submitted successfully!");
    } catch (err) {
      console.error("Error applying for job", err.response?.data || err);
      alert("❌ Failed to apply for job.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h3 className="mb-4">Apply for a Job</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="jobId"
            placeholder="Job ID"
            className="form-control mb-3"
            value={form.jobId}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="jobSeekerId"
            placeholder="Job Seeker ID"
            className="form-control mb-3"
            value={form.jobSeekerId}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="applicantName"
            placeholder="Your Name"
            className="form-control mb-3"
            value={form.applicantName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="resumePath"
            placeholder="Resume Path / URL"
            className="form-control mb-3"
            value={form.resumePath}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn btn-warning fw-bold">
            Apply
          </button>
        </form>
      </div>

      {/* Show Response */}
      {response && (
        <div className="card shadow p-3 mt-4">
          <h5>Application Result</h5>
          <p>
            <strong>Application ID:</strong> {response.applicationId}
          </p>
          <p>
            <strong>Job ID:</strong> {response.jobId}
          </p>
          <p>
            <strong>Status:</strong> {response.status}
          </p>
          <p className="text-muted">{response.message}</p>
        </div>
      )}
    </div>
  );
}

export default ApplyJob;
