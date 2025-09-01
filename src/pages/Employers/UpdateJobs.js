import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const employerId = localStorage.getItem("employerId");
  const token = localStorage.getItem("token");

  const [job, setJob] = useState({
    jobId,
    employerId,
    jobTitle: "",
    jobDescription: "",
    location: "",
    employmentType: "",
    salaryRange: "",
    workMode: "",
    categoryId: "",
    companyId: ""
  });

  // fetch this job’s details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5062/api/Employer/${employerId}/JobListings`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const jobData = response.data.find(j => j.jobId.toString() === jobId);
        if (jobData) {
          setJob(jobData);
        }
      } catch (err) {
        console.error("Error fetching job details", err);
      }
    };
    fetchJob();
  }, [employerId, jobId, token]);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:5062/api/Employer/UpdateJobListing",
        job,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Job updated successfully!");
      navigate("/manage-jobs");
    } catch (err) {
      console.error("Error updating job", err.response?.data || err.message);
      alert("Update failed.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Update Job</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <input
          className="form-control mb-2"
          name="jobTitle"
          placeholder="Job Title"
          value={job.jobTitle}
          onChange={handleChange}
        />
        <textarea
          className="form-control mb-2"
          name="jobDescription"
          placeholder="Job Description"
          value={job.jobDescription}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="location"
          placeholder="Location"
          value={job.location}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="employmentType"
          placeholder="Employment Type"
          value={job.employmentType}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="salaryRange"
          placeholder="Salary Range"
          value={job.salaryRange}
          onChange={handleChange}
        />
        <select
          className="form-control mb-2"
          name="workMode"
          value={job.workMode}
          onChange={handleChange}
        >
          <option value="">Select Work Mode</option>
          <option value="Onsite">Onsite</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <input
          type="number"
          className="form-control mb-2"
          name="categoryId"
          placeholder="Category Id"
          value={job.categoryId}
          onChange={handleChange}
        />
        <input
          type="number"
          className="form-control mb-2"
          name="companyId"
          placeholder="Company Id"
          value={job.companyId}
          onChange={handleChange}
        />

        <button className="btn btn-warning">Update Job</button>
      </form>
    </div>
  );
}

export default UpdateJob;
