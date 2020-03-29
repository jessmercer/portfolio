import { HashRouter, Route } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import thunk from 'redux-thunk';

import Header from '../components/header';
import Home from '../pages/home';

import { routes } from '../lib/constants';
import rootReducer from '../reducers';

import './index.css';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default () => (
  <Provider store={store}>
    <HashRouter>
      <Header />
      <Route path={routes.home} exact component={Home} />
      <Route path={`${routes.project}/:slug`} component={Home} />
      <Route path={routes.contact} exact component={Home} />
    </HashRouter>
  </Provider>
);
