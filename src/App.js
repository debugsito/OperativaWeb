import React from 'react';
import './assets/css/variables.css';
import './assets/css/footerTable.css';
import './index.css';
import { requestFirebaseNotificationPermission, onMessageListener } from './firebaseInit'


import AppRouter from './routers';

function App() {
  requestFirebaseNotificationPermission()
  .then((firebaseToken) => {
    // eslint-disable-next-line no-console
    console.log('firebaseToken');
    console.log(firebaseToken);
  })
  .catch((err) => {
    console.log('error notification permission', err)
    return err;
  });

  onMessageListener()
  .then((payload) => {
    const { title, body } = payload.data;
    // eslint-disable-next-line no-console
    console.log(title,body);
  })
  .catch((err) => {
    console.error(JSON.stringify(err));
  });

  return (
    <AppRouter />
  );
}

export default App;
