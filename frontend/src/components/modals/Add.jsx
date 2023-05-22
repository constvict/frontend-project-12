import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { useSocket } from '../../hooks/index.js';
import {
  actions as channelsActions,
  selectors as channelsSelectors,
} from '../../slices/channelsSlice.js';
import { actions as modalsActions } from '../../slices/modalsSlice.js';

const Add = () => {
  const dispatch = useDispatch();
  const inputEl = useRef();
  const chat = useSocket();

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const channels = useSelector(channelsSelectors.selectAll);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(3, 'Must be at least 3 characters')
      .max(20, 'Must be less than 20 characters')
      .notOneOf(
        channels.map((channel) => channel.name),
        'This channel name already exists',
      )
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const callback = (id) => dispatch(channelsActions.setCurrentChannelId(id));
      chat.addChannel({ name: values.name }, callback);
      dispatch(modalsActions.hideModal());
    },
  });

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => dispatch(modalsActions.hideModal())}>
        <Modal.Title>Add</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control
            className="mb-2"
            onChange={formik.handleChange}
            ref={inputEl}
            id="name"
            name="name"
            value={formik.values.name}
            isInvalid={formik.errors.name && formik.touched.name}
            autoComplete="off"
          />
          <Form.Label htmlFor="name" className="visually-hidden">
            +
          </Form.Label>
          <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={() => dispatch(modalsActions.hideModal())}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
