import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import React from 'react';
import Login from './Login';
import NotFound from './NotFound';
import Register from './Register';
import Chat from './Chat';
import Header from './Header';
import { useAuth } from '../hooks/index.js';
import AuthProvider from '../contexts/AuthProvider';

const ChatRoute = () => {
  const auth = useAuth();
  return (
    auth.user ? <Chat /> : <Navigate to="/login" />
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column vh-100 bg-light">
        <Header />
        <Routes>
          <Route path="/" element={<ChatRoute />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
