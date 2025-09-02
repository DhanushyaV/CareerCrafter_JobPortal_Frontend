import React, { useEffect, useState } from "react";
import axios from "axios";

function JobSeekerProfile() {
  const jobSeekerId = localStorage.getItem("jobSeekerId");
  const token = localStorage.getItem("token");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5062/api/JobSeeker/${jobSeekerId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };
    fetchProfile();
  }, [jobSeekerId, token]);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <div className="row">
          {/* Left Side */}
          <div className="col-md-3 text-center border-end">
            <div
              className="rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center mx-auto mb-3"
              style={{ width: "120px", height: "120px", fontSize: "40px" }}
            >
              {profile.fullName?.charAt(0) || "👤"}
            </div>
            <h5 className="fw-bold">{profile.fullName}</h5>
            <p className="text-muted">{profile.email}</p>
            <p>{profile.phoneNumber}</p>
            <p>{profile.address}</p>
            {profile.resumePath && (
              <a href={profile.resumePath} className="btn btn-sm btn-outline-dark mt-2">
                View Resume
              </a>
            )}
          </div>

          {/* Right Side */}
          <div className="col-md-9">
            <h4 className="fw-bold mb-3">About Me</h4>
            <p>{profile.summary}</p>

            {/* Education */}
            <h5 className="mt-4">🎓 Education</h5>
            {profile.qualifications.map((q, i) => (
              <div key={i} className="mb-2">
                <strong>{q.degreeName} in {q.specialization}</strong>
                <p className="mb-0">{q.institutionName} ({q.graduationYear})</p>
              </div>
            ))}

            {/* Work Experience */}
            <h5 className="mt-4">💼 Work Experience</h5>
            {profile.workExperiences.map((w, i) => (
              <div key={i} className="mb-2">
                <strong>{w.jobTitle}</strong> at {w.companyName} ({new Date(w.startDate).getFullYear()} - {w.endDate ? new Date(w.endDate).getFullYear() : "Present"})
                <p className="mb-0">{w.location}</p>
                <p className="text-muted">{w.description}</p>
              </div>
            ))}

            {/* Skills */}
            <h5 className="mt-4">🛠 Skills</h5>
            <div className="d-flex flex-wrap gap-2">
              {profile.skills.map((s, i) => (
                <span key={i} className="badge bg-dark">{s.skillName}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobSeekerProfile;
