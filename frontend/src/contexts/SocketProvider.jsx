import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from './index.js';
import initSocket from '../socket';
import routes from '../routes.js';

const SocketProvider = ({ children }) => {
  const navigate = useNavigate();
  const [socket] = useState(() => initSocket({
    onDisconnect: () => navigate(routes.rootPage()),
  }));

  useEffect(() => () => socket.disconnect(), [socket]);

  return (
    <SocketContext.Provider
      value={socket}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
