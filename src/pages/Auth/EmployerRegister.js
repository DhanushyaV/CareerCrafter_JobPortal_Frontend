import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EmployerRegister() {
  const [form, setForm] = useState({
    companyName: "",
    contactNumber: "",
    companyWebsite: ""
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
        "http://localhost:5062/api/Authentication/RegisterEmployer",
        form
      );
      setMessage(
  `Registration Successful! ID: ${response.data.employerId}, Message: ${response.data.message}. Please login to continue.`
);
    } catch (err) {
      setMessage("Employer registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Employer Registration</h2>
      {message && <p className="text-success">{message}</p>}
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <input className="form-control mb-2" name="companyName" placeholder="Company Name" onChange={handleChange} />
        <input className="form-control mb-2" name="contactNumber" placeholder="Contact Number" onChange={handleChange} />
        <input className="form-control mb-2" name="companyWebsite" placeholder="Company Website" onChange={handleChange} />
        <button className="btn btn-warning">Register</button>
      </form>
    </div>
  );
}

export default EmployerRegister;
