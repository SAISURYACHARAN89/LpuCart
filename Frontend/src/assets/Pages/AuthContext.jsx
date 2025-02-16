import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();
export const backendContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkAuth = () => setIsLoggedIn(!!localStorage.getItem("token"));
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  const backendurl = "https://lpucart-vg56.onrender.com"

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <backendContext.Provider value={{backendurl}}>
      {children}
      </backendContext.Provider>
    </AuthContext.Provider>
  );
};
