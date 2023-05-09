import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import NotFound from './NotFound';
import Register from './Register';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
