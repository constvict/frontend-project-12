import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index.js';
import routes from '../routes.js';
import image from '../assets/signupavatar.jpg';

const RegistrationPage = () => {
  const auth = useAuth();
  const inputRef = useRef();
  const { t } = useTranslation();
  const [registrationFailed, setRegistrationFailed] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = Yup.object().shape({
    username: Yup
      .string()
      .trim()
      .required(t('signup.required'))
      .min(3, t('signup.usernameSymbolsRequired'))
      .max(20, t('signup.usernameSymbolsRequired')),
    password: Yup
      .string()
      .trim()
      .required(t('signup.required'))
      .min(6, t('signup.passwordSymbolsRequired')),
    confirmPassword: Yup
      .string()
      .oneOf([Yup.ref('password')], t('signup.passwordsMustMatch')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setRegistrationFailed(false);
      try {
        const response = await axios.post(routes.registrationPath(), {
          username: values.username,
          password: values.password,
        });
        auth.logIn(response.data);
      } catch (error) {
        if (error.isAxiosError) {
          if (error.response.status === 409) {
            setRegistrationFailed(true);
            inputRef.current.select();
          } else {
            toast.error(t('errors.network'));
          }
        } else {
          toast.error(t('errors.unknown'));
          throw error;
        }
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src={image}
                  className="rounded-circle"
                  alt={t('image')}
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('signup.header')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={
                      (formik.errors.username && formik.touched.username)
                      || registrationFailed
                    }
                    ref={inputRef}
                    placeholder={t('signup.usernameLengthRequired')}
                    required
                  />
                  <Form.Label htmlFor="username">{t('signup.username')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip placement="right">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    name="password"
                    id="password"
                    aria-describedby="passwordHelpBlock"
                    isInvalid={
                      (formik.errors.password && formik.touched.password)
                      || registrationFailed
                    }
                    autoComplete="new-password"
                    placeholder={t('signup.passwordLengthRequired')}
                    required
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    name="confirmPassword"
                    id="confirmPassword"
                    isInvalid={
                      (formik.errors.confirmPassword && formik.touched.confirmPassword)
                      || registrationFailed
                    }
                    autoComplete="new-password"
                    placeholder={t('signup.passwordsMustMatch')}
                    required
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {registrationFailed ? t('signup.alreadyExists') : formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="confirmPassword">{t('signup.confirm')}</Form.Label>
                </Form.Group>
                <Button type="submit" variant="outline-primary" className="w-100">{t('signup.submit')}</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
