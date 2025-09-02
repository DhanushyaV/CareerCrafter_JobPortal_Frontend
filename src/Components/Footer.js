import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{
        background: "#0d1b2a",
        color: "#ffffff",
        padding: "20px 0",
        marginTop: "auto",
      }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        <p className="mb-0">&copy; {new Date().getFullYear()} CareerCrafter. All rights reserved.</p>
        <div>
          <Link to="/about" className="text-warning me-3">About</Link>
          <Link to="/contact" className="text-warning me-3">Contact</Link>
          <Link to="/privacy" className="text-warning">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
