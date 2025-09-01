import React, { useEffect, useState } from "react";
import axios from "axios";

function EmployerProfile() {
  const employerId = localStorage.getItem("employerId");
  const token = localStorage.getItem("token");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5062/api/Employer/${employerId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };
    fetchProfile();
  }, [employerId, token]);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="container mt-4">
      <h3>{profile.companyName}</h3>
      <p><strong>Contact:</strong> {profile.contactNumber}</p>
      <p><strong>Website:</strong> {profile.companyWebsite}</p>
    </div>
  );
}

export default EmployerProfile;
