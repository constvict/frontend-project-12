import React from 'react';
import { Button, Col, Nav } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import { actions as modalsActions } from '../../slices/modalsSlice.js';
import Channel from './Channel.jsx';

const Channels = () => {
  const channels = useSelector(channelsSelectors.selectAll);
  const dispatch = useDispatch();

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Channels</b>
        <Button
          onClick={() => dispatch(modalsActions.showModal({ modalType: 'addChannel', itemId: null }))}
          variant="text-primary"
          className="p-0 text-primary btn btn-group-vertical"
        >
          <PlusSquare
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav
        variant="pills"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.length > 0
          && channels.map((channel) => <Channel key={channel.id} channel={channel} />)}
      </Nav>
    </Col>
  );
};

export default Channels;
