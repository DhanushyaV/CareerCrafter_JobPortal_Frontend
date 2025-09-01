import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
  userId: 0,        // only needed for update
  fullName: "",    
  email: "",
  password: "",   
  roleId: 0         
});
  const [isUpdate, setIsUpdate] = useState(false);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5062/api/User", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Submit create or update
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (isUpdate) {
      await axios.put(`http://localhost:5062/api/User/${form.userId}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("✅ User updated successfully!");
    } else {
      await axios.post("http://localhost:5062/api/User", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("✅ User created successfully!");
    }
    setForm({ userId: 0, fullName: "", email: "", password: "", roleId: 0 });
    setIsUpdate(false);
    fetchUsers();
  } catch (err) {
    console.error("Error saving user", err.response?.data || err);
  }
};


  // 🔹 Edit user
  const handleEdit = (user) => {
    setForm(user);
    setIsUpdate(true);
  };

  // 🔹 Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5062/api/User/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("❌ User deleted!");
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">👨‍💼 Admin Dashboard - Manage Users</h2>

      {/* User Form */}
      <div className="card p-3 mb-4">
        <h5>{isUpdate ? "Update User" : "Create User"}</h5>
        <form onSubmit={handleSubmit} className="row g-2">
  {isUpdate && (
    <input
      className="form-control"
      name="userId"
      value={form.userId}
      readOnly
    />
  )}
  
  <div className="col-md-3">
    <input
      className="form-control"
      name="fullName"
      placeholder="Full Name"
      value={form.fullName}
      onChange={handleChange}
      required
    />
  </div>

  <div className="col-md-3">
    <input
      type="email"
      className="form-control"
      name="email"
      placeholder="Email"
      value={form.email}
      onChange={handleChange}
      required
    />
  </div>

  {!isUpdate && (   // password only required for new users
    <div className="col-md-3">
      <input
        type="password"
        className="form-control"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
    </div>
  )}

  <div className="col-md-2">
    <input
      type="number"
      className="form-control"
      name="roleId"
      placeholder="Role ID"
      value={form.roleId}
      onChange={handleChange}
      required
    />
  </div>

  <div className="col-md-1">
    <button type="submit" className="btn btn-warning w-100">
      {isUpdate ? "Update" : "Create"}
    </button>
  </div>
</form>

      </div>

      {/* Users Table */}
      <div className="card p-3">
        <h5>All Users</h5>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>UserId</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u.userId}>
                  <td>{u.userId}</td> 
                  <td>{u.fullName}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info me-2"
                      onClick={() => handleEdit(u)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(u.userId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
