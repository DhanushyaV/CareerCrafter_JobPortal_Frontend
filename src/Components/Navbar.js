import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get user info from localStorage
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Decide dashboard path based on role
  const dashboardPath = role === "Employer" ? "/employer/dashboard" : "/seeker/dashboard";

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#0d1b2a" }}>
      <div className="container">
        <Link className="navbar-brand fw-bold text-warning" to="/">
          CareerCrafter
        </Link>

        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            {!username ? (
              // 🔹 When NOT logged in
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === "/" ? "active text-warning" : "text-light"}`}
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === "/login" ? "active text-warning" : "text-light"}`}
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
  <Link
    className={`nav-link ${location.pathname === "/register" ? "active text-warning" : "text-light"}`}
    to="/register"
  >
    Register
  </Link>
</li>

              </>
            ) : (
              // 🔹 When LOGGED IN
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === dashboardPath ? "active text-warning" : "text-light"}`}
                    to={dashboardPath}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link text-light">
                    Welcome, <b className="text-warning">{username}</b> ({role})
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger ms-2" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
