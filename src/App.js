import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/common/Home";
import Login from "./pages/Auth/Login";
import EmployerDashboard from "./pages/Employers/EmployerDashboard";
import SeekerDashboard from "./pages/Jobseekers/JobseekerDashboard";
import Register from "./pages/Auth/Register";
import JobseekerRegister from "./pages/Auth/JobseekerRegister";
import EmployerRegister from "./pages/Auth/EmployerRegister";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import SearchJobs from "./pages/Jobseekers/SearchJobs";
import MyApplications from "./pages/Jobseekers/MyApplications";

import ApplyJob from "./pages/Jobseekers/ApplyJob";
import CreateProfile from "./pages/Jobseekers/CreateProfile";


import UpdateProfile from "./pages/Jobseekers/UpdateProfile";

// inside <Routes>





// New Employer Pages
import PostJob from "./pages/Employers/PostJob";
import ManageJobs from "./pages/Employers/ManageJobs";
import ViewApplications from "./pages/Employers/ViewApplication";
import UpdateJobs from "./pages/Employers/UpdateJobs";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/seeker" element={<JobseekerRegister />} />
        <Route path="/register/employer" element={<EmployerRegister />} />
        <Route path="/applications/:jobId" element={<ViewApplications />} />


        {/* JobSeeker */}
        <Route path="/seeker/dashboard" element={<SeekerDashboard />} />
        <Route path="/jobs" element={<SearchJobs />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/applications" element={<MyApplications />} />
        <Route path="/apply-job" element={<ApplyJob />} />
        <Route path="/apply-job" element={<ApplyJob />} />

        {/* Employer */}
        <Route path="/employer/dashboard" element={<EmployerDashboard />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/manage-jobs" element={<ManageJobs />} />
        <Route path="/view-applications" element={<ViewApplications />} />
        <Route path="/update-job/:jobId" element={<UpdateJobs />} />

        
      <Route path="/Admin/dashboard" element={<AdminDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;

