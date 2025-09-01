import axios from "axios";

const API_URL = "http://localhost:5062/api/Authentication/Login"; // adjust if different

const login = async (email, password) => {
  const response = await axios.post(API_URL + "login", { email, password });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  login,
  register,
  logout
};
