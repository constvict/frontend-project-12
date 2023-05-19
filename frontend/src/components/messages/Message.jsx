import React from 'react';
import { useAuth } from '../../hooks/index.js';

const Message = (props) => {
  const { content } = props;
  const auth = useAuth();
  const isCurrentUser = content.username === auth.user.username;

  return (
    <div className="text-break mb-2">
      <b className={`${isCurrentUser ? 'text-success' : 'text-body'}`}>{content.username}</b>
      :
      {' '}
      {content.body}
    </div>
  );
};

export default Message;
