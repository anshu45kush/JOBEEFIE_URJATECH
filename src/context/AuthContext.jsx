import React, { createContext, useContext, useState, useEffect } from "react";
//done by me himani
const AuthContext = createContext();

const TEMP_CREDENTIALS = {
  admin: { email: "admin@jobeefie.in", password: "Urja@Admin2026" },
  employee: { email: "employee@jobeefie.in", password: "Urja@Emp2026" },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    if (
      email === TEMP_CREDENTIALS.admin.email &&
      password === TEMP_CREDENTIALS.admin.password
    ) {
      const userData = { email, role: "admin" };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return userData;
    }

    if (
      email === TEMP_CREDENTIALS.employee.email &&
      password === TEMP_CREDENTIALS.employee.password
    ) {
      const userData = { email, role: "employee" };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return userData;
    }

    return null;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};