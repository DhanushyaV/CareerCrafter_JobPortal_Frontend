import React, { useState } from "react";
import axios from "axios";

function UpdateProfile() {
  const token = localStorage.getItem("token");
  const jobSeekerId = localStorage.getItem("jobSeekerId");

  const [form, setForm] = useState({
    jobSeekerId: jobSeekerId,
    phoneNumber: "",
    address: "",
    qualification: "",
    experienceYears: 0,
    skills: "",
    resumePath: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:5062/api/JobSeeker/UpdateProfile",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`✅ ${res.data.message}\nName: ${res.data.fullname}`);
    } catch (err) {
      console.error("Update error", err.response?.data || err);
      alert("❌ Failed to update profile");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h3 className="mb-4">Update Profile</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="hidden"
            name="jobSeekerId"
            value={form.jobSeekerId}
          />
          <input
            className="form-control mb-3"
            name="phoneNumber"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-3"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-3"
            name="qualification"
            placeholder="Qualification"
            value={form.qualification}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            className="form-control mb-3"
            name="experienceYears"
            placeholder="Experience (Years)"
            value={form.experienceYears}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-3"
            name="skills"
            placeholder="Skills"
            value={form.skills}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-3"
            name="resumePath"
            placeholder="Resume Path / URL"
            value={form.resumePath}
            onChange={handleChange}
          />

          <button type="submit" className="btn btn-warning fw-bold">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;


