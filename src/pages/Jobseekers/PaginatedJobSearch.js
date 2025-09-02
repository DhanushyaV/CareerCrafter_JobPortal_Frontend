import React, { useState } from "react";
import axios from "axios";

function PaginatedJobSearch() {
  const token = localStorage.getItem("token");

  const [filters, setFilters] = useState({
    jobTitle: "",
    location: "",
    workMode: "",
    pageNumber: 1,
    pageSize: 5, // default items per page
  });

  const [jobs, setJobs] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  // handle input change
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // search API
  const handleSearch = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5062/api/JobSearch/Search",
        filters,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setJobs(res.data.jobs);
      setTotalCount(res.data.totalCount);
    } catch (err) {
      console.error("Search error:", err);
      alert("❌ Failed to search jobs");
    }
  };

  // pagination
  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    setFilters({ ...filters, pageNumber: newPage });
    handleSearch();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">🔍 Paginated Job Search</h2>

      {/* Filters */}
      <div className="card p-3 mb-4 shadow-sm">
        <div className="row g-2">
          <div className="col-md-3">
            <input
              className="form-control"
              name="jobTitle"
              placeholder="Job Title"
              value={filters.jobTitle}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              name="location"
              placeholder="Location"
              value={filters.location}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <input
              className="form-control"
              name="workMode"
              placeholder="Work Mode"
              value={filters.workMode}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-control"
              name="pageSize"
              value={filters.pageSize}
              onChange={handleChange}
            >
              <option value="5">5 / page</option>
              <option value="10">10 / page</option>
              <option value="20">20 / page</option>
            </select>
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-warning w-100 fw-bold"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="row">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div className="col-md-4 mb-3" key={job.jobId}>
              <div className="card shadow-sm p-3 h-100">
                <h5>{job.jobTitle}</h5>
                <p><strong>Company ID:</strong> {job.employerId}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Work Mode:</strong> {job.workMode}</p>
                <p><strong>Salary:</strong> {job.salaryRange}</p>
                <p><small>📅 Posted: {new Date(job.postedDate).toLocaleDateString()}</small></p>
              </div>
            </div>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalCount > 0 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button
            className="btn btn-dark"
            onClick={() => handlePageChange(filters.pageNumber - 1)}
            disabled={filters.pageNumber === 1}
          >
            ⬅ Prev
          </button>
          <span>
            Page {filters.pageNumber} of{" "}
            {Math.ceil(totalCount / filters.pageSize)}
          </span>
          <button
            className="btn btn-dark"
            onClick={() => handlePageChange(filters.pageNumber + 1)}
            disabled={filters.pageNumber >= Math.ceil(totalCount / filters.pageSize)}
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
}

export default PaginatedJobSearch;
