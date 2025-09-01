import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to right, #0d1b2a, #1b263b)" }}>
      <div className="container d-flex align-items-center justify-content-between text-light" style={{ minHeight: "90vh" }}>
        
        {/* Left Section */}
        <div>
          <h1 className="fw-bold display-4">Welcome to <span className="text-warning">CareerCrafter</span></h1>
          <p className="lead mt-3">
            Your gateway to opportunities — find your dream job or hire the best talent today.
          </p>
          <div className="mt-4">
            <Link to="/login" className="btn btn-warning btn-lg rounded-pill me-3">Browse Jobs</Link>
            <Link to="/register" className="btn btn-outline-light btn-lg rounded-pill">Post a Job</Link>
          </div>
        </div>

        {/* Right Section (Image or Illustration) */}
        <div>
        <img 
          src="Working Professional.jpeg" 
          alt="Working Professional" 
          style={{ width: "400px", borderRadius: "100px", boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" }}
        />

           
        </div>
      </div>
    </div>
  );
}

export default Home;
