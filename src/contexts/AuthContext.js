import React, { createContext, useContext, useEffect, useState } from "react";

// shape of auth state
const initialAuth = {
  token: null,
  username: null,
  userId: null,
  roleId: null,
  jobSeekerId: null,
  employerId: null,
  // helper:
  isAuthenticated: false
};

const AuthContext = createContext({
  auth: initialAuth,
  setAuth: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuthState] = useState(() => {
    // initialize from localStorage if present
    const token = localStorage.getItem("token");
    return {
      token,
      username: localStorage.getItem("username"),
      userId: localStorage.getItem("userId"),
      roleId: localStorage.getItem("roleId"),
      jobSeekerId: localStorage.getItem("jobSeekerId"),
      employerId: localStorage.getItem("employerId"),
      isAuthenticated: !!token
    };
  });

  // sync to localStorage whenever auth changes
  useEffect(() => {
    if (auth.token) {
      localStorage.setItem("token", auth.token);
      if (auth.username) localStorage.setItem("username", auth.username);
      if (auth.userId) localStorage.setItem("userId", auth.userId);
      if (auth.roleId) localStorage.setItem("roleId", auth.roleId);
      if (auth.jobSeekerId) localStorage.setItem("jobSeekerId", auth.jobSeekerId);
      if (auth.employerId) localStorage.setItem("employerId", auth.employerId);
    } else {
      // logout -> clear stored auth keys only
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
      localStorage.removeItem("roleId");
      localStorage.removeItem("jobSeekerId");
      localStorage.removeItem("employerId");
    }
  }, [auth]);

  const setAuth = (payload) => {
    // payload: { token, username, userId, roleId, jobSeekerId, employerId }
    setAuthState({
      token: payload.token || null,
      username: payload.username || null,
      userId: payload.userId ?? null,
      roleId: payload.roleId ?? null,
      jobSeekerId: payload.jobSeekerId ?? null,
      employerId: payload.employerId ?? null,
      isAuthenticated: !!payload.token
    });
  };

  const logout = () => {
    setAuthState({ ...initialAuth });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook
export const useAuth = () => useContext(AuthContext);
