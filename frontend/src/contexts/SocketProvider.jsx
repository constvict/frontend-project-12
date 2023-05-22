import React from 'react';
import { SocketContext } from './index.js';

const SocketProvider = ({ socket, children }) => {
  const {
    addMessage, addChannel, removeChannel, renameChannel,
  } = socket;

  return (
    <SocketContext.Provider
      value={{
        addMessage, addChannel, removeChannel, renameChannel,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
