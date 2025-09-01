import axios from "axios";

const API_URL = "http://localhost:5062/api/Employer";

const token = () => localStorage.getItem("token");

export const getEmployerJobs = (employerId) =>
  axios.get(`${API_URL}/${employerId}/JobListings`, {
    headers: { Authorization: `Bearer ${token()}` },
  });

export const createJob = (jobData) =>
  axios.post(`${API_URL}/CreateJobListing`, jobData, {
    headers: { Authorization: `Bearer ${token()}` },
  });

export const updateJob = (jobData) =>
  axios.put(`${API_URL}/UpdateJobListing`, jobData, {
    headers: { Authorization: `Bearer ${token()}` },
  });

export const deleteJob = (jobId) =>
  axios.delete(`${API_URL}/DeleteJob/${jobId}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });

export const viewApplications = (jobId) =>
  axios.get(`${API_URL}/ViewApplications/${jobId}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
