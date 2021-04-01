import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import 'jest-enzyme';
import nock from 'nock';

nock.disableNetConnect();

configure({ adapter: new Adapter() });

// export const setupTestComponent = ({ render } = {}) => ({ props } = {}) => ({
//   wrapper: mount(
//     <MemoryRouter>{React.cloneElement(render(), props)}</MemoryRouter>
//   )
// });

export const setupTestComponent = ({
  render,
  path: basePath,
  initialEntries: baseInitialEntries
} = {}) => ({
  props,
  path: testPath,
  initialEntries: testInitialEntries
} = {}) => {
  let history;
  const path = testPath || basePath || '*';
  const initialEntries = testInitialEntries || baseInitialEntries || ['/'];

  return {
    wrapper: mount(
      <MemoryRouter initialEntries={initialEntries}>
        <Route
          path={path}
          render={({ history: _history }) => {
            history = _history;
            return React.cloneElement(render(), props);
          }}
        />
      </MemoryRouter>
    ),
    history
  };
};
