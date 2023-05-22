import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import SocketProvider from './contexts/SocketProvider.jsx';
import App from './components/App.jsx';
import store from './slices/index.js';
import initSocket from './socket.js';
import resources from './locales/index.js';

const init = async () => {
  const socket = initSocket();
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <Provider store={store}>
      <SocketProvider socket={socket}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </SocketProvider>
    </Provider>
  );
};

export default init;
