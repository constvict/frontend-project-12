import React from 'react';
import { SocketContext } from './index.js';

const SocketProvider = ({ socket, children }) => {
  const {
    addMessage, addChannel, removeChannel, renameChannel, disconnect,
  } = socket;

  return (
    <SocketContext.Provider
      value={{
        addMessage, addChannel, removeChannel, renameChannel, disconnect,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
