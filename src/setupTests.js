import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import { createStore, compose, applyMiddleware } from 'redux';
import { MemoryRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import 'jest-enzyme';

import rootReducer from './reducers';

configure({ adapter: new Adapter() });

export const setupTestComponent = ({ render } = {}) => ({ props } = {}) => ({
  wrapper: mount(
    <MemoryRouter>{React.cloneElement(render(), props)}</MemoryRouter>
  )
});

export const setupTestProvider = ({
  render,
  prerender: basePrerender = () => {}
} = {}) => ({ props, prerender: testPrerender = () => {} } = {}) => {
  const store = createStore(rootReducer, {}, compose(applyMiddleware(thunk)));
  let history;
  basePrerender(store);
  testPrerender(store);

  return {
    wrapper: mount(
      <MemoryRouter>
        <Provider store={store}>
          <Route
            path="*"
            render={({ history: _history }) => {
              history = _history;
              return React.cloneElement(render(), props);
            }}
          />
        </Provider>
      </MemoryRouter>
    ),
    store,
    history
  };
};
