import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import Login from './Login';
import NotFound from './NotFound';
import Registration from './Registration';
import Chat from './Chat';
import Header from './Header';
import { useAuth } from '../hooks/index.js';
import AuthProvider from '../contexts/AuthProvider';
import routes from '../routes';

const ChatRoute = () => {
  const auth = useAuth();
  return (
    auth.user ? <Chat /> : <Navigate to={routes.loginPage()} />
  );
};

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <div className="d-flex flex-column vh-100 bg-light">
        <Header />
        <Routes>
          <Route path={routes.rootPage()} element={<ChatRoute />} />
          <Route path={routes.loginPage()} element={<Login />} />
          <Route path={routes.registrationPage()} element={<Registration />} />
          <Route path={routes.notFoundPage()} element={<NotFound />} />
        </Routes>
      </div>
      <ToastContainer />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
