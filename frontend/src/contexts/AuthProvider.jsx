import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../routes.js';
import { AuthContext } from './index.js';
import initSocket from '../socket.js';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);
  const [socket, setSocket] = useState(null);

  const navigate = useNavigate();

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
    navigate(routes.rootPage());
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
    navigate(routes.rootPage());
  };

  useEffect(() => {
    if (user) {
      const socketInstance = initSocket();
      setSocket(socketInstance);
    }
  }, [user]);

  const getAuthHeader = () => {
    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData && userData.token) {
      return { Authorization: `Bearer ${userData.token}` };
    }
    return {};
  };

  return (
    <AuthContext.Provider value={{
      user, logIn, logOut, getAuthHeader, socket,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
