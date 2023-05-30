import React from 'react';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import leoProfanity from 'leo-profanity';
import App from './components/App.jsx';
import store from './slices/index.js';
import resources from './locales/index.js';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
};

const initializeApp = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  leoProfanity.clearList();
  leoProfanity.add(leoProfanity.getDictionary('en'));
  leoProfanity.add(leoProfanity.getDictionary('ru'));

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default initializeApp;
