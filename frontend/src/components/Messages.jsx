import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';
import { selectors as messagesSelectors } from '../slices/messagesSlice.js';

const Messages = () => {
  const [message, setMessage] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    setMessage('');
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const currentChannel = useSelector(
    (state) => channelsSelectors.selectById(state, currentChannelId),
  );

  const messages = useSelector(messagesSelectors.selectAll);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {currentChannel?.name}
            </b>
          </p>
          <span className="text-muted">
            {messages.length}
            {' '}
            messages
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          <div className="text-break mb-2">
            <b>admin: </b>
            <span>Hi!</span>
          </div>
          <div className="text-break mb-2">
            <b>lolguy: </b>
            <span>One more test message</span>
          </div>
        </div>
        <div className="mt-auto px-5 py-3">
          <form onSubmit={handleSubmit} noValidate="" className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <input
                onChange={handleChange}
                autoComplete="off"
                name="body"
                aria-label="New message"
                placeholder="Type Message..."
                className="border-0 p-0 ps-2 form-control"
                value={message}
                ref={inputRef}
              />
              <button type="submit" className="btn btn-group-vertical" disabled="">
                <span>Send</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
