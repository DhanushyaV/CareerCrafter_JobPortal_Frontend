import React, { useEffect, useState } from "react";
import axios from "axios";

function CreateProfile() {
  const token = localStorage.getItem("token");
  const jobSeekerId = localStorage.getItem("jobSeekerId");
  const userId = localStorage.getItem("userId"); // Comes from login

  const [form, setForm] = useState({
    userId: 0,  // always use logged-in userId
    username: "",
    phoneNumber: "",
    email: "",
    address: "",
    qualification: "",
    experienceYears: 0,
    skills: "",
    resumePath: ""
  });

  const [isUpdate, setIsUpdate] = useState(false);

  // 🔹 Fetch profile (if exists)
  useEffect(() => {
    const fetchProfile = async () => {
      if (!jobSeekerId) return;

      try {
        const res = await axios.get(
          `http://localhost:5062/api/JobSeeker/${jobSeekerId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data) {
          setForm({
            userId: res.data.userId, // keep userId from login
            username: res.data.username || "",
            phoneNumber: res.data.phoneNumber || "",
            email: res.data.email || "",
            address: res.data.address || "",
            qualification: res.data.qualification || "",
            experienceYears: res.data.experienceYears || 0,
            skills: res.data.skills || "",
            resumePath: res.data.resumePath || ""
          });
          setIsUpdate(true);
        }
      } catch (err) {
        console.warn("No existing profile found → Create mode");
      }
    };
    fetchProfile();
  }, [jobSeekerId, token, userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdate) {
        const res = await axios.put(
          "http://localhost:5062/api/JobSeeker/UpdateProfile",
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert(`✅ Profile updated: ${res.data.message}`);
      } else {
        const res = await axios.post(
          "http://localhost:5062/api/JobSeeker/CreateProfile",
          form, // 👈 includes userId
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert(`✅ Profile created: ${res.data.message}`);
        localStorage.setItem("jobSeekerId", res.data.jobSeekerId);
        setIsUpdate(true);
      }
    } catch (err) {
      console.error("Error saving profile", err.response?.data || err);
      alert("❌ Failed to save profile. Check if userId exists in DB.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h3 className="mb-4">{isUpdate ? "Update Profile" : "Create Profile"}</h3>
        <form onSubmit={handleSubmit}>
          {/* userId shown as read-only */}
          <input
            className="form-control mb-3"
            name="userId"
            value={form.userId}
            readOnly
          />

          <input
            className="form-control mb-3"
            name="username"
            placeholder="Full Name"
            value={form.username}
            onChange={handleChange}
            required
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
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="qualification"
            placeholder="Qualification"
            value={form.qualification}
            onChange={handleChange}
          />

          <input
            type="number"
            className="form-control mb-3"
            name="experienceYears"
            placeholder="Experience (Years)"
            value={form.experienceYears}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="skills"
            placeholder="Skills (comma separated)"
            value={form.skills}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="resumePath"
            placeholder="Resume Path / URL"
            value={form.resumePath}
            onChange={handleChange}
          />

          <button type="submit" className="btn btn-warning fw-bold">
            {isUpdate ? "Update Profile" : "Create Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProfile;
