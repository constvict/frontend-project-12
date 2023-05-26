import { io } from 'socket.io-client';
import store from './slices/index.js';
import { actions as messagesActions } from './slices/messagesSlice.js';
import { actions as channelsActions } from './slices/channelsSlice.js';

const handleNewMessage = (payload) => {
  store.dispatch(messagesActions.addMessage(payload));
};

const handleNewChannel = (payload) => {
  store.dispatch(channelsActions.addChannel(payload));
};

const handleRemoveChannel = (payload) => {
  store.dispatch(channelsActions.removeChannel(payload));
};

const handleRenameChannel = (payload) => {
  const { name, id } = payload;
  store.dispatch(
    channelsActions.renameChannel({
      id,
      changes: {
        name,
      },
    }),
  );
};

const initSocket = () => {
  const socket = io();

  socket.on('newMessage', handleNewMessage);
  socket.on('newChannel', handleNewChannel);
  socket.on('removeChannel', handleRemoveChannel);
  socket.on('renameChannel', handleRenameChannel);

  const addMessage = (message) => {
    socket.emit('newMessage', message, (response) => {
      if (response.status !== 'ok') {
        console.error(response.status);
      }
    });
  };

  const addChannel = (channel, callback) => {
    socket.emit('newChannel', channel, ({ data, status }) => {
      if (status === 'ok') {
        callback(data.id);
      } else {
        console.error(status);
      }
    });
  };

  const removeChannel = (id) => {
    socket.emit('removeChannel', { id }, (response) => {
      if (response.status !== 'ok') {
        console.error(response.status);
      }
    });
  };

  const renameChannel = (renamedChannel) => {
    socket.emit('renameChannel', renamedChannel, (response) => {
      if (response.status !== 'ok') {
        console.error(response.status);
      }
    });
  };

  const disconnect = () => {
    if (socket.connected) {
      socket.disconnect();
    }
  };

  return {
    addMessage,
    addChannel,
    removeChannel,
    renameChannel,
    disconnect,
  };
};

export default initSocket;
