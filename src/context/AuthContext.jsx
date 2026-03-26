import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser && storedUser !== "undefined"
    ? JSON.parse(storedUser)
    : null;
  });

  const login = (data) => {
    const { accessToken, user } = data;
    localStorage.setItem("token", accessToken);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(accessToken);
    setUser(user);
  };

  const logout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (err) {
      console.log("Logout backend error", err);
    }

    localStorage.clear();
    setToken(null);
    setUser(null);
  };

  // Auto Attach Token
  useEffect(() => {
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete API.defaults.headers.common["Authorization"];
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);