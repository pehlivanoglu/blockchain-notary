import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuth } from '../services/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      const isValid = await checkAuth();
      if (isValid) {
        const storedNid = localStorage.getItem('nid');
        const storedFullName = localStorage.getItem('fullName');
        const storedPhoneNumber = localStorage.getItem('phoneNumber');
      
        if (storedNid && storedFullName && storedPhoneNumber) {
          setUser({
            nid: storedNid,
            fullName: storedFullName,
            phoneNumber: storedPhoneNumber
          });
          setIsAuthenticated(true);
        }
      } else {
        logout();
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nid');
    localStorage.removeItem('fullName');
    localStorage.removeItem('phoneNumber');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/');
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const value = {
    nid: localStorage.getItem('nid'),
    fullName: localStorage.getItem('fullName'),
    phoneNumber: localStorage.getItem('phoneNumber'),
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};