import React, { useEffect } from 'react';
import ReactGa from 'react-ga';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from './redux-store';
import Router from './Router/router';

const store = createStore(reducers, applyMiddleware(thunk));

const App = () => {
  useEffect(() => {
    ReactGa.initialize('UA-179958704-1');
    //page view
    ReactGa.pageview(window.location.pathname + window.location.search);
  }, []);

  /**
   * Provider: Donde se almacena la información al store
   */
  return (
    <Provider store={store}>
      <div className="container-fluid container-no-padding">
        <Router />
      </div>
    </Provider>
  );
};

export default App;
