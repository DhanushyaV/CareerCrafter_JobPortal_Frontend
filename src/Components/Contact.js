import React from "react";

function Contact() {
  return (
    <div
      style={{
        minHeight: "80vh",
        background: "linear-gradient(to right, #0d1b2a, #1b263b)",
        color: "white",
        padding: "60px 20px",
      }}
    >
      <div className="container text-center">
        <h2 className="fw-bold text-warning mb-4">Contact Us</h2>
        <p className="lead mb-4">
          Have questions or need support? Get in touch with the CareerCrafter team.
        </p>

        <div className="row justify-content-center">
          <div className="col-md-6 text-start">
            <h5 className="text-warning">📍 Address</h5>
            <p>123 Career Street, Coimbatore, India</p>

            <h5 className="text-warning">📞 Phone</h5>
            <p>+91 98765 43210</p>

            <h5 className="text-warning">📧 Email</h5>
            <p>support@careercrafter.com</p>
          </div>
        </div>

        <div className="mt-4">
          <form className="mx-auto" style={{ maxWidth: "500px" }}>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Your Name" required />
            </div>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Your Email" required />
            </div>
            <div className="mb-3">
              <textarea className="form-control" rows="4" placeholder="Your Message" required></textarea>
            </div>
            <button type="submit" className="btn btn-warning w-100 rounded-pill">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
