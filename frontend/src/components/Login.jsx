import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index.js';
import routes from '../routes.js';
import image from '../assets/loginavatar.jpeg';

const Login = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup
        .string()
        .trim()
        .required(t('login.required')),
      password: Yup
        .string()
        .trim()
        .required(t('login.required')),
    }),

    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.loginPath(), values);
        auth.logIn(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log(response.data);
        navigate('/');
      } catch (error) {
        setAuthFailed(true);
        inputRef.current.select();
        console.log(error);
      }
    },
  });

  return (
    <div className="d-flex flex-column h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={image}
                  className="rounded-circle"
                  alt={t('image')}
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('login.header')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    name="username"
                    autoComplete="username"
                    id="username"
                    isInvalid={(formik.touched.username && !!formik.errors.username) || authFailed}
                    ref={inputRef}
                    placeholder={t('login.username')}
                    required
                  />
                  <Form.Label htmlFor="username">{t('login.username')}</Form.Label>
                  <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    name="password"
                    autoComplete="current-password"
                    type="password"
                    id="password"
                    isInvalid={(formik.touched.password && !!formik.errors.password) || authFailed}
                    placeholder={t('login.password')}
                    required
                  />
                  <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
                  {authFailed && (
                  <Form.Control.Feedback type="invalid" tooltip placement="right">
                    {t('login.authFailed')}
                  </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Button
                  disabled={!formik.isValid}
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3"
                >
                  {t('login.submit')}
                </Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('login.unregistred')}</span>
                {' '}
                <Link to="/register">{t('login.signup')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
