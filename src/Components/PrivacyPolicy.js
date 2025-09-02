import React from "react";

function PrivacyPolicy() {
  return (
    <div
      style={{
        minHeight: "80vh",
        background: "linear-gradient(to right, #1b263b, #0d1b2a)",
        color: "white",
        padding: "60px 20px",
      }}
    >
      <div className="container">
        <h2 className="fw-bold text-warning mb-4 text-center">Privacy Policy</h2>
        <p className="lead mb-4 text-center">
          We value your privacy and are committed to protecting your personal information.
        </p>

        <h5 className="text-warning">1. Information We Collect</h5>
        <p>
          We collect basic details like your name, email, and resume only to connect job seekers and employers.
        </p>

        <h5 className="text-warning">2. How We Use Your Data</h5>
        <p>
          Your data is used solely for improving your job search or hiring experience on CareerCrafter. 
          We do not sell your data to third parties.
        </p>

        <h5 className="text-warning">3. Security</h5>
        <p>
          We use secure practices to safeguard your data, but no system is 100% secure.
        </p>

        <h5 className="text-warning">4. Contact</h5>
        <p>
          For privacy concerns, contact us at <b>privacy@careercrafter.com</b>.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
