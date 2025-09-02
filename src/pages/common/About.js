import React from "react";

function About() {
  return (
    <div
      style={{
        minHeight: "80vh",
        background: "linear-gradient(to right, #1b263b, #0d1b2a)",
        color: "white",
        padding: "60px 20px",
      }}
    >
      <div className="container text-center">
        <h2 className="fw-bold text-warning mb-4">About CareerCrafter</h2>
        <p className="lead mb-4">
          CareerCrafter is your gateway to endless career opportunities.  
          Whether you are a job seeker aiming to land your dream job or an employer 
          looking for top talent, our platform brings the right people together.  
        </p>
        <p>
          We focus on simplicity, efficiency, and connecting people with the roles that best 
          suit their skills and aspirations. With powerful tools for job browsing, posting, 
          and management, CareerCrafter makes the hiring journey smooth and efficient.
        </p>
      </div>
    </div>
  );
}

export default About;
