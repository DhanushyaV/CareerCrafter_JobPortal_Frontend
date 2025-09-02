import React, { useState } from "react";
import axios from "axios";

function ViewEmployerProfile() {
  const [employer, setEmployer] = useState(null);
  const [inputEmployerId, setInputEmployerId] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleGetEmployer = async () => {
    if (!inputEmployerId) {
      alert("Please enter Employer ID");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5062/api/Employer/${inputEmployerId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEmployer(res.data);
    } catch (err) {
      console.error("Error fetching employer profile", err);
      alert("Failed to fetch employer profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="mb-4">🏢 Employer Profile</h3>

        {/* Input for Employer ID */}
        <div className="d-flex gap-2 mb-3">
          <input
            type="number"
            placeholder="Enter Employer ID"
            className="form-control"
            value={inputEmployerId}
            onChange={(e) => setInputEmployerId(e.target.value)}
          />
          <button
            onClick={handleGetEmployer}
            className="btn btn-primary fw-bold"
          >
            Get Profile
          </button>
        </div>

        {/* Show Employer Profile */}
        {loading ? (
          <p>Loading...</p>
        ) : employer ? (
          <div className="card p-4 shadow-sm">
            <h4 className="fw-bold text-primary">{employer.companyName}</h4>
            <p>
              <strong>Employer ID:</strong> {employer.employerId}
            </p>
            <p>
              <strong>Full Name:</strong> {employer.fullName}
            </p>
            <p>
              <strong>Email:</strong> {employer.email}
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a href={employer.website} target="_blank" rel="noreferrer">
                {employer.website}
              </a>
            </p>
            <p>
              <strong>Contact Email:</strong> {employer.contactEmail}
            </p>
            <p>
              <strong>Phone:</strong> {employer.contactPhone}
            </p>
            <p>
              <strong>Address:</strong> {employer.address}
            </p>
            <p className="text-muted">
              <strong>About Company:</strong> {employer.companyDescription}
            </p>
          </div>
        ) : (
          <p className="text-muted">No employer profile found</p>
        )}
      </div>
    </div>
  );
}

export default ViewEmployerProfile;
