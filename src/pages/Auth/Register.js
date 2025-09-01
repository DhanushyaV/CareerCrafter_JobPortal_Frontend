import React, { useState } from "react";
import SeekerRegister from "./JobseekerRegister";
import EmployerRegister from "./EmployerRegister";

function Register() {
  const [role, setRole] = useState(""); // "" | "seeker" | "employer"

  if (role === "seeker") {
    return <SeekerRegister />;
  }

  if (role === "employer") {
    return <EmployerRegister />;
  }

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-3">Register</h2>
      <p className="text-muted">Choose your role to continue registration</p>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <button className="btn btn-warning p-3 fw-bold rounded-3 shadow"
          onClick={() => setRole("seeker")}>
          I am a Job Seeker
        </button>
        <button className="btn btn-dark p-3 fw-bold rounded-3 shadow"
          onClick={() => setRole("employer")}>
          I am an Employer
        </button>
      </div>
    </div>
  );
}

export default Register;
