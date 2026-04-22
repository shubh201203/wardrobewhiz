import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [user, setUser] = useState(null);

  // Fake initial load logic (e.g., getting returning users)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 1500); // splash screen delay
    return () => clearTimeout(timer);
  }, []);

  const login = async (username) => {
    setIsLoggingIn(true);
    // Fake AI initialization delay
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsAuthenticated(true);
        setUser({ name: username || 'Fashionista' });
        setIsLoggingIn(false);
        resolve();
      }, 2500); // 2.5s spinner: "Setting up your AI stylist..."
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isInitializing, isLoggingIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
