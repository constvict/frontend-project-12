import { io } from 'socket.io-client';
import store from './slices/index.js';
import { actions as messagesActions } from './slices/messagesSlice.js';

const socket = io();

const addNewMessage = (message) => socket.emit('newMessage', message, (response) => {
  if (response.status !== 'ok') {
    console.error(response.status);
  }
});

socket.on('newMessage', (payload) => {
  store.dispatch(messagesActions.addMessage(payload));
});

export { socket, addNewMessage };
