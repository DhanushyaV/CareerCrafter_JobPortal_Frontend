import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PostJob() {
  const employerId = localStorage.getItem("employerId"); // must come from login
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [job, setJob] = useState({

    jobTitle: "",
    jobDescription: "",
    location: "",
    employmentType: "",
    salaryRange: "",
    workMode: "",
    categoryId: "",
    companyId: ""
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employerId) {
      alert("Error: EmployerId missing. Please login as an Employer.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5062/api/Employer/CreateJobListing",
        {
          employerId: parseInt(job.employerId), 
          categoryId: parseInt(job.categoryId) || 0,
          companyId: parseInt(job.companyId) || 0,
          jobTitle: job.jobTitle,
          jobDescription: job.jobDescription,
          location: job.location,
          employmentType: job.employmentType,
          salaryRange: job.salaryRange,
          workMode: job.workMode
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      console.log("Job Created:", response.data);
      alert("Job posted successfully!");
      navigate("/employer/dashboard");
    } catch (err) {
      console.error("Error posting job", err.response?.data || err.message);
      alert("Failed to post job. Please check EmployerId and inputs.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="mb-4">Post a New Job</h3>
        <form onSubmit={handleSubmit}>
          {/* Hidden EmployerId */}
          <input
          type="number"
          className="form-control mb-3"
          name="employerId"
          placeholder="Employer Id"
          value={job.employerId}
          onChange={handleChange}
        />


          <input
            className="form-control mb-3"
            name="jobTitle"
            placeholder="Job Title"
            value={job.jobTitle}
            onChange={handleChange}
            required
          />

          <textarea
            className="form-control mb-3"
            name="jobDescription"
            placeholder="Job Description"
            value={job.jobDescription}
            onChange={handleChange}
            required
          ></textarea>

          <input
            className="form-control mb-3"
            name="location"
            placeholder="Location"
            value={job.location}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            name="employmentType"
            placeholder="Employment Type (e.g. Full-Time)"
            value={job.employmentType}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            name="salaryRange"
            placeholder="Salary Range (e.g. 20k-40k)"
            value={job.salaryRange}
            onChange={handleChange}
            required
          />

          <select
            className="form-control mb-3"
            name="workMode"
            value={job.workMode}
            onChange={handleChange}
            required
          >
            <option value="">Select Work Mode</option>
            <option value="Onsite">Onsite</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>

          <input
            type="number"
            className="form-control mb-3"
            name="categoryId"
            placeholder="Category Id"
            value={job.categoryId}
            onChange={handleChange}
          />

          <input
            type="number"
            className="form-control mb-3"
            name="companyId"
            placeholder="Company Id"
            value={job.companyId}
            onChange={handleChange}
          />

          <button type="submit" className="btn btn-warning fw-bold">
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostJob;
