import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [createForm, setCreateForm] = useState({
    fullName: "",
    email: "",
    password: "",
    roleId: 0,
  });

  const [updateForm, setUpdateForm] = useState(null); // null means no edit mode
  const [searchId, setSearchId] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5062/api/User", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form changes
  const handleCreateChange = (e) => {
    setCreateForm({ ...createForm, [e.target.name]: e.target.value });
  };

  const handleUpdateChange = (e) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  // Create user
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5062/api/User", createForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ User created successfully!");
      setCreateForm({ fullName: "", email: "", password: "", roleId: 0 });
      fetchUsers();
    } catch (err) {
      console.error("Error creating user", err.response?.data || err);
    }
  };

  // Update user
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5062/api/User/${updateForm.userId}`,
        updateForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ User updated successfully!");
      setUpdateForm(null); // exit edit mode
      fetchUsers();
    } catch (err) {
      console.error("Error updating user", err.response?.data || err);
    }
  };

  const handleEdit = (user) => {
    setUpdateForm(user);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5062/api/User/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("❌ User deleted!");
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user", err);
    }
  };

  // Fetch one user by ID
  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5062/api/User/${searchId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSearchedUser(res.data);
    } catch (err) {
      alert("❌ User not found");
      setSearchedUser(null);
    }
  };

  return (
    <div className="container mt-4">
      {/* Header Banner */}
      <div
        className="p-4 mb-4 text-white rounded shadow"
        style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)" }}
      >
        <h2>👨‍💼 Admin Dashboard</h2>
        <p className="mb-0">Manage users in the CareerCrafter platform</p>
      </div>

      {/* Create User Form */}
      <div className="card shadow p-4 mb-4">
        <h5 className="mb-3">➕ Create New User</h5>
        <form onSubmit={handleCreate} className="row g-3">
          <div className="col-md-3">
            <input
              className="form-control"
              name="fullName"
              placeholder="Full Name"
              value={createForm.fullName}
              onChange={handleCreateChange}
              required
            />
          </div>

          <div className="col-md-3">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={createForm.email}
              onChange={handleCreateChange}
              required
            />
          </div>

          <div className="col-md-3">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={createForm.password}
              onChange={handleCreateChange}
              required
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              name="roleId"
              placeholder="Role ID"
              value={createForm.roleId}
              onChange={handleCreateChange}
              required
            />
          </div>

          <div className="col-md-1">
            <button type="submit" className="btn btn-primary w-100">
              Create
            </button>
          </div>
        </form>
      </div>

      {/* Update User Form (only shows when editing) */}
      {updateForm && (
        <div className="card shadow p-4 mb-4 bg-light">
          <h5 className="mb-3">✏️ Update User</h5>
          <form onSubmit={handleUpdate} className="row g-3">
            <div className="col-md-2">
              <input
                className="form-control"
                name="userId"
                value={updateForm.userId}
                readOnly
              />
            </div>
            <div className="col-md-3">
              <input
                className="form-control"
                name="fullName"
                value={updateForm.fullName}
                onChange={handleUpdateChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="email"
                className="form-control"
                name="email"
                value={updateForm.email}
                onChange={handleUpdateChange}
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                name="roleId"
                value={updateForm.roleId}
                onChange={handleUpdateChange}
              />
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-success w-100">
                Update
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search User by ID */}
      <div className="card shadow p-4 mb-4">
        <h5>🔍 Get User by ID</h5>
        <div className="d-flex gap-2">
          <input
            type="number"
            className="form-control"
            placeholder="Enter User ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button onClick={handleSearch} className="btn btn-dark">
            Search
          </button>
        </div>
        {searchedUser && (
          <div className="mt-3">
            <p><strong>ID:</strong> {searchedUser.userId}</p>
            <p><strong>Name:</strong> {searchedUser.fullName}</p>
            <p><strong>Email:</strong> {searchedUser.email}</p>
            <p><strong>Role:</strong> {searchedUser.role}</p>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="card shadow p-4">
        <h5 className="mb-3">📋 All Users</h5>
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>UserId</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u.userId}>
                  <td>{u.userId}</td>
                  <td>{u.fullName}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className="badge bg-info text-dark">{u.role}</span>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleEdit(u)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(u.userId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
