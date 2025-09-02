import React, { useState } from "react";
import axios from "axios";

function ViewApplications() {
  const token = localStorage.getItem("token");

  const [applications, setApplications] = useState([]);
  const [inputJobId, setInputJobId] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch applications by JobId
  const handleGetApplications = async () => {
    if (!inputJobId) {
      alert("Please enter a Job ID");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5062/api/Application/ByJob/${inputJobId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplications(res.data);
    } catch (err) {
      console.error("Error fetching applications", err);
      alert("Failed to load applications. Please check JobId.");
    } finally {
      setLoading(false);
    }
  };

  // Update status of application
  const handleUpdateStatus = async (applicationId, status) => {
    try {
      await axios.put(
        `http://localhost:5062/api/Application/UpdateStatus`,
        { applicationId, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`✅ Application #${applicationId} marked as ${status}`);
      handleGetApplications(); // refresh list
    } catch (err) {
      console.error("Error updating status", err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="mb-4">📄 View Applications by Job ID</h3>

        {/* Input for JobId */}
        <div className="d-flex gap-2 mb-3">
          <input
            type="number"
            placeholder="Enter Job ID"
            className="form-control"
            value={inputJobId}
            onChange={(e) => setInputJobId(e.target.value)}
          />
          <button
            onClick={handleGetApplications}
            className="btn btn-warning fw-bold"
          >
            Get Application status
          </button>
        </div>

        {/* Applications List */}
        {loading ? (
          <p>Loading...</p>
        ) : applications.length > 0 ? (
          <div className="row">
            {applications.map((app) => (
              <div key={app.applicationId} className="col-md-4 mb-3">
                <div className="card shadow-sm p-3">
                  <h5 className="fw-bold">Application #{app.applicationId}</h5>
                  <p><strong>Job ID:</strong> {app.jobId}</p>
                  <p><strong>Applicant:</strong> {app.jobSeekerId}</p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge ${
                        app.status === "Pending"
                          ? "bg-warning text-dark"
                          : app.status === "Accepted"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {app.status}
                    </span>
                  </p>

                  {/* Action Buttons */}
                  {app.status === "Pending" && (
                    <div className="d-flex gap-2 mt-2">
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleUpdateStatus(app.applicationId, "Accepted")}
                      >
                        ✅ Accept
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleUpdateStatus(app.applicationId, "Rejected")}
                      >
                        ❌ Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">No applications found for this job.</p>
        )}
      </div>
    </div>
  );
}

export default ViewApplications;
