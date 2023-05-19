import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import Channels from './channels/ChannelsBox.jsx';
import Messages from './messages/MessagesBox.jsx';
import getModal from './modals/index.js';
import routes from '../routes.js';
import { useAuth } from '../hooks/index.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const Chat = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.modals.modalType);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(routes.dataPath(), { headers: auth.getAuthHeader() });

      const { channels, currentChannelId, messages } = response.data;

      dispatch(channelsActions.addChannels(channels));
      dispatch(channelsActions.setCurrentChannelId(currentChannelId));
      dispatch(messagesActions.addMessages(messages));
    };
    fetchData();
  }, [auth, dispatch]);

  const renderModal = (type) => {
    if (!type) {
      return null;
    }
    const Modal = getModal(type);
    return <Modal />;
  };

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </div>
      {renderModal(modalType)}
    </div>
  );
};

export default Chat;
