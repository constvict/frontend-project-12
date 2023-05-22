import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/index.js';
import routes from '../routes.js';
import image from '../assets/loginavatar.jpeg';

const Login = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required('Username is required')
        .min(5, 'Username must be at least 5 characters')
        .max(20, 'Username must be at most 20 characters'),
      password: Yup.string()
        .required('Password is required')
        .min(5, 'Password must be at least 5 characters')
        .max(50, 'Password must be at most 50 characters'),
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
                  alt="loginheader"
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">Login Page</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    name="username"
                    autoComplete="username"
                    id="username"
                    isInvalid={(formik.touched.username && !!formik.errors.username) || authFailed}
                    ref={inputRef}
                    placeholder="Login"
                    required
                  />
                  <Form.Label htmlFor="username">Login</Form.Label>
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
                    placeholder="Password"
                    required
                  />
                  <Form.Label htmlFor="password">Password</Form.Label>
                  {authFailed && (
                  <Form.Control.Feedback type="invalid" tooltip placement="right">
                    Неверные имя пользователя или пароль
                  </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Button
                  disabled={!formik.isValid}
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3"
                >
                  Submit
                </Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Don&apos;t have an account?</span>
                {' '}
                <Link to="/register">Register</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
