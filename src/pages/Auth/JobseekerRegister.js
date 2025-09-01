import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SeekerRegister() {
  const [form, setForm] = useState({
    username: "",
    phoneNumber: "",
    email: "",
    address: "",
    qualification: "",
    experienceYears: 0,
    skills: "",
    resumePath: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5062/api/Authentication/RegisterJobSeeker",
        form
      );
      setMessage(
  `Registration Successful! ID: ${response.data.jobSeekerId}, Message: ${response.data.message}. Please login to continue.`
);

    } catch (err) {
      setMessage("Job Seeker registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Job Seeker Registration</h2>
      {message && <p className="text-success">{message}</p>}
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <input className="form-control mb-2" name="username" placeholder="Full Name" onChange={handleChange} />
        <input className="form-control mb-2" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
        <input className="form-control mb-2" name="email" placeholder="Email" onChange={handleChange} />
        <input className="form-control mb-2" name="address" placeholder="Address" onChange={handleChange} />
        <input className="form-control mb-2" name="qualification" placeholder="Qualification" onChange={handleChange} />
        <input className="form-control mb-2" type="number" name="experienceYears" placeholder="Experience (years)" onChange={handleChange} />
        <input className="form-control mb-2" name="skills" placeholder="Skills" onChange={handleChange} />
        <input className="form-control mb-2" name="resumePath" placeholder="Resume Path" onChange={handleChange} />
        <button className="btn btn-warning">Register</button>
      </form>
    </div>
  );
}

export default SeekerRegister;
