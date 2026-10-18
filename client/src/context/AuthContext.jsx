import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('wardrobewhiz_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return Boolean(localStorage.getItem('wardrobewhiz_user'));
    } catch {
      return false;
    }
  });
  const [isInitializing, setIsInitializing] = useState(() => {
    // If already authenticated from previous session, skip long splash delay
    return !localStorage.getItem('wardrobewhiz_user');
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Splash screen delay for new visitors only
  useEffect(() => {
    if (isInitializing) {
      const timer = setTimeout(() => {
        setIsInitializing(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isInitializing]);

  const login = async (username, isGuest = false) => {
    const displayName = username?.trim() || (isGuest ? 'Guest Stylist' : 'Fashionista');
    const userData = { name: displayName, isGuest };

    if (isGuest) {
      // Instant access for recruiters and demo evaluators
      localStorage.setItem('wardrobewhiz_user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      return;
    }

    setIsLoggingIn(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem('wardrobewhiz_user', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
        setIsLoggingIn(false);
        resolve();
      }, 1500);
    });
  };

  const logout = () => {
    try {
      localStorage.removeItem('wardrobewhiz_user');
    } catch (e) {
      console.error(e);
    }
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
