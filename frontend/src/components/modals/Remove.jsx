import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../hooks/index.js';
import { actions as modalsActions } from '../../slices/modalsSlice.js';

const Remove = () => {
  const dispatch = useDispatch();
  const chat = useSocket();
  const itemId = useSelector((state) => state.modals.itemId);

  const handleRemove = (channelId) => {
    chat.removeChannel(channelId);
    dispatch(modalsActions.hideModal());
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => dispatch(modalsActions.hideModal())}>
        <Modal.Title>Delete channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Are you sure?</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={() => dispatch(modalsActions.hideModal())}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="danger"
            onClick={() => handleRemove(itemId)}
          >
            Delete
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
