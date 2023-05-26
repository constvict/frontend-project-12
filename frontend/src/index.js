import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import initializeApp from './init.js';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const vdom = await initializeApp();
  root.render(vdom);
};

app();
