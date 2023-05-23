import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import leoProfanity from 'leo-profanity';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
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
  const { t } = useTranslation();

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const channels = useSelector(channelsSelectors.selectAll);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(3, t('modalAdd.symbolsRequired'))
      .max(20, t('modalAdd.symbolsRequired'))
      .notOneOf(
        channels.map((channel) => channel.name),
        t('modalAdd.unique'),
      )
      .required(t('modalAdd.required')),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const callback = (id) => dispatch(channelsActions.setCurrentChannelId(id));
      const cleanedChannelName = leoProfanity.clean(values.name);
      chat.addChannel({ name: cleanedChannelName }, callback);
      dispatch(modalsActions.hideModal());
      toast.success(t('modalAdd.success'));
    },
  });

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => dispatch(modalsActions.hideModal())}>
        <Modal.Title>{t('modalAdd.addChannel')}</Modal.Title>
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
            {t('modalAdd.name')}
          </Form.Label>
          <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={() => dispatch(modalsActions.hideModal())}>
              {t('modalAdd.cancel')}
            </Button>
            <Button type="submit" variant="primary">
              {t('modalAdd.send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
