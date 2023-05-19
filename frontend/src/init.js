import React from 'react';
import { Provider } from 'react-redux';
import SocketProvider from './contexts/SocketProvider.jsx';
import App from './components/App.jsx';
import store from './slices/index.js';
import initSocket from './socket.js';

const init = async () => {
  const socket = initSocket();

  return (
    <Provider store={store}>
      <SocketProvider socket={socket}>
        <App />
      </SocketProvider>
    </Provider>
  );
};

export default init;
