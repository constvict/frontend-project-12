import React, { useEffect, useRef } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useAuth, useSocket } from '../../hooks/index.js';
import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import { selectors as messagesSelectors } from '../../slices/messagesSlice.js';
import Message from './Message.jsx';

const Messages = () => {
  const inputRef = useRef();
  const lastMessageRef = useRef();
  const auth = useAuth();
  const chat = useSocket();
  const { t } = useTranslation();

  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannel = useSelector(
    (state) => channelsSelectors.selectById(state, currentChannelId),
  );
  const messages = useSelector(messagesSelectors.selectAll);
  const currentMessages = messages.filter(
    (currentMessage) => currentMessage.channelId === currentChannelId,
  );

  useEffect(() => {
    inputRef.current.focus();
  });

  useEffect(() => {
    lastMessageRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  }, [currentMessages]);

  const validationSchema = yup.object().shape({
    body: yup.string().trim().required(),
  });

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const { body } = values;
      const channelId = currentChannelId;
      const { username } = auth.user;
      const data = {
        body,
        channelId,
        username,
      };
      chat.addMessage(data);
      resetForm();
    },
  });

  const renderMessages = () => {
    if (currentMessages.length === 0) {
      return null;
    }
    return currentMessages.map((message) => (
      <Message key={message.id} content={message} />
    ));
  };

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentChannel?.name}`}</b>
          </p>
          <span className="text-muted">
            {t('messages.counter.key', { count: currentMessages.length })}
          </span>
        </div>
        <div className="overflow-auto px-5 d-flex flex-column">
          {renderMessages()}
          <span ref={lastMessageRef} />
        </div>
        <div className="mt-auto px-5 py-3">
          <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
            <InputGroup>
              <Form.Control
                onChange={formik.handleChange}
                name="body"
                aria-label={t('messages.new')}
                placeholder={t('messages.input')}
                className="border-0 p-0 ps-2 form-control"
                value={formik.values.body}
                ref={inputRef}
                disabled={formik.isSubmitting}
                autoComplete="off"
              />
              <Button
                type="submit"
                variant="link"
                className="btn-group-vertical"
                disabled={formik.errors.body || !formik.values.body}
              >
                <ArrowRightSquare
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                />
                <span className="visually-hidden">{t('messages.send')}</span>
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
