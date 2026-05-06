import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = sessionStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      sessionStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  // Mock login: If email contains 'admin', they are an admin
  const login = (email, password, name) => {
    const role = email.toLowerCase().includes('admin') ? 'admin' : 'user';

    // Check if user already exists in local storage
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (existingUser) {
      setCurrentUser(existingUser);
    } else {
      const newUser = {
        name: name || email.split('@')[0],
        email,
        role,
        avatar: `https://ui-avatars.com/api/?name=${name || email.split('@')[0]}&background=0d9488&color=fff`
      };
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
    }
  };

  const signup = (name, email, password) => {
    login(email, password, name);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.email.toLowerCase() === updatedUser.email.toLowerCase() ? updatedUser : u));
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
