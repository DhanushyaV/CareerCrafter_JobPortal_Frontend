import React, { useState } from "react";
import axios from "axios";

function MyApplications() {
  const token = localStorage.getItem("token");
  const [applications, setApplications] = useState([]);
  const [inputId, setInputId] = useState("");

  const handleGetApplications = async () => {
    try {
      const targetId = inputId; // take from input box
      if (!targetId) {
        alert("Please enter your JobSeeker ID");
        return;
      }

      const res = await axios.get(
        `http://localhost:5062/api/JobSeeker/GetApplications/${targetId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplications(res.data);
    } catch (err) {
      console.error("Error fetching applications", err);
      alert("Failed to load applications");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">📄 My Application status</h3>

      {/* Input + Button */}
      <div className="card shadow p-3 mb-4">
        <h5 className="mb-3">Get Applications By JobSeekerId</h5>
        <div className="d-flex gap-2">
          <input
            type="number"
            placeholder="Enter JobSeeker ID"
            className="form-control"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
          />
          <button
            onClick={handleGetApplications}
            className="btn btn-info fw-bold"
          >
            Get Application status
          </button>
        </div>
      </div>

      {/* Applications */}
      {applications.length > 0 ? (
        <div className="row">
          {applications.map((app) => (
            <div key={app.applicationId} className="col-md-4 mb-3">
              <div className="card shadow-sm p-3 border-0">
                <h5 className="fw-bold text-warning">
                  Application #{app.applicationId}
                </h5>
                <p>
                  <strong>Job ID:</strong> {app.jobId}
                </p>
                <p>
                  <strong>Status: </strong>
                  <span
                    className={`badge ${
                      app.status === "Pending"
                        ? "bg-warning text-dark"
                        : app.status === "Rejected"
                        ? "bg-danger"
                        : "bg-success"
                    }`}
                  >
                    {app.status}
                  </span>
                </p>
                <p className="text-muted">
                  <small>{app.message}</small>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-secondary">No applications found</div>
      )}
    </div>
  );
}

export default MyApplications;
