import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5062/api/Authentication/Login", {
        email,
        password,
      });

      console.log("API Response:", response.data);
      const data = response.data;

      // Save common user details
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.userId);

      // ✅ Role based redirection
      if (data.role === "Employer") {
        localStorage.setItem("employerId", data.employerId);
       // comes from backend
        navigate("/employer/dashboard");
      } 
      else if (data.role === "JobSeeker") {
        localStorage.setItem("jobSeekerId", data.jobSeekerId); // comes from backend
        navigate("/seeker/dashboard");
      } 
      else if (data.role === "Admin") {
        navigate("/admin/dashboard");
      } 
      else {
        navigate("/"); // fallback
      }

    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control rounded-pill"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control rounded-pill"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-warning w-100 rounded-pill">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
