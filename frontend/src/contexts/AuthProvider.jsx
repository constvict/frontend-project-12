import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../routes.js';
import { AuthContext } from './index.js';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);

  const navigate = useNavigate();

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
    navigate(routes.rootPage());
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate(routes.rootPage());
  };

  const getAuthHeader = () => {
    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData && userData.token) {
      return { Authorization: `Bearer ${userData.token}` };
    }
    return {};
  };

  const isAuthenticated = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    return userData && userData.token;
  };

  return (
    <AuthContext.Provider value={{
      user, logIn, logOut, getAuthHeader, isAuthenticated,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
