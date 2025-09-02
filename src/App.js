import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

//common pages
import Home from "./pages/common/Home";
import Login from "./pages/Auth/Login";
import About from "./pages/common/About";
import Register from "./pages/Auth/Register";
import Contact from "./Components/Contact";
import PrivacyPolicy from "./Components/PrivacyPolicy";

import JobseekerRegister from "./pages/Auth/JobseekerRegister";
import EmployerRegister from "./pages/Auth/EmployerRegister";

//Deashboards
import EmployerDashboard from "./pages/Employers/EmployerDashboard";
import SeekerDashboard from "./pages/Jobseekers/JobseekerDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";

//jobseeker pages
import SearchJobs from "./pages/Jobseekers/SearchJobs";
import MyApplications from "./pages/Jobseekers/MyApplications";
import ApplyJob from "./pages/Jobseekers/ApplyJob";
import CreateProfile from "./pages/Jobseekers/CreateProfile";
import UpdateProfile from "./pages/Jobseekers/UpdateProfile";
import PaginatedJobSearch from "./pages/Jobseekers/PaginatedJobSearch";

// New Employer Pages
import PostJob from "./pages/Employers/PostJob";
import ManageJobs from "./pages/Employers/ManageJobs";
import ViewApplications from "./pages/Employers/ViewApplication";
import UpdateJobs from "./pages/Employers/UpdateJobs";
import ViewEmployerProfile from "./pages/Employers/ViewEmployerProfile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          {/* Navbar at top */}
          <Navbar />

          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />

            <Route path="/register/seeker" element={<JobseekerRegister />} />
            <Route path="/register/employer" element={<EmployerRegister />} />

            {/* JobSeeker */}
            <Route path="/seeker/dashboard" element={<SeekerDashboard />} />

            <Route path="/jobs" element={<SearchJobs />} />
            <Route path="/create-profile" element={<CreateProfile />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/applications" element={<MyApplications />} />
            <Route path="/applications/:jobId" element={<ViewApplications />} />
            <Route path="/apply-job" element={<ApplyJob />} />
            <Route path="/apply-job" element={<ApplyJob />} />
            <Route path="/paginated-job-search" element={<PaginatedJobSearch />} />
            

            {/* Employer */}
            <Route path="/employer/dashboard" element={<EmployerDashboard />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/manage-jobs" element={<ManageJobs />} />
            <Route path="/view-applications" element={<ViewApplications />} />
            <Route path="/update-job/:jobId" element={<UpdateJobs />} />
            <Route path="/employer-profile" element={<ViewEmployerProfile />} />

            {/* Admin */}
            <Route path="/Admin/dashboard" element={<AdminDashboard />} />
          </Routes>

          {/* Footer always at bottom */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
