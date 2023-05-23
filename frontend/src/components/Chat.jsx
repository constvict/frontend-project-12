import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Spinner from 'react-bootstrap/Spinner';
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
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(routes.dataPath(), { headers: auth.getAuthHeader() });

        const { channels, currentChannelId, messages } = response.data;

        dispatch(channelsActions.addChannels(channels));
        dispatch(channelsActions.setCurrentChannelId(currentChannelId));
        dispatch(messagesActions.addMessages(messages));

        setTimeout(() => {
          setIsLoading(false);
        }, 100);
      } catch (error) {
        setIsLoading(false);
        if (error.isAxiosError) {
          toast.error(t('errors.network'));
        } else {
          toast.error(t('errors.unknown'));
          throw error;
        }
      }
    };
    fetchData();
  }, [auth, dispatch, t]);

  const renderModal = (type) => {
    if (!type) {
      return null;
    }
    const Modal = getModal(type);
    return <Modal />;
  };

  return (
    <>
      {isLoading ? (
        <div className="h-100 d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status" variant="primary" />
        </div>
      ) : (
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <Channels />
            <Messages />
          </div>
        </div>
      )}
      {renderModal(modalType)}
    </>
  );
};

export default Chat;
