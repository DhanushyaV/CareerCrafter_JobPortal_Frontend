import React, { useState } from "react";
import axios from "axios";

function ViewApplications() {
  const token = localStorage.getItem("token");

  const [applications, setApplications] = useState([]);
  const [inputJobId, setInputJobId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGetApplications = async () => {
    if (!inputJobId) {
      alert("Please enter a Job ID");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5062/api/Employer/ViewApplications/${inputJobId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Applications response:", res.data);
      setApplications(res.data);
    } catch (err) {
      console.error("Error fetching applications", err);
      alert("Failed to load applications. Please check JobId.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="mb-4">View Applications by JobId</h3>

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
            className="btn btn-info fw-bold"
          >
            Get Applications
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
                  <p>
                    <strong>Status:</strong> {app.status}
                  </p>
                  <p className="text-muted">{app.message}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">No applications found.</p>
        )}
      </div>
    </div>
  );
}

export default ViewApplications;
