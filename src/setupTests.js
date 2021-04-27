import React from 'react';
// import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import { mount } from 'enzyme';
import { rest } from 'msw';
import { setupServer as mswSetupServer } from 'msw/node';
import { renderHook as reactHooksRenderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query';
import { MemoryRouter, Route } from 'react-router-dom';
// import 'jest-enzyme';

// configure({ adapter: new Adapter() });

// export const setupTestComponent = ({ render } = {}) => ({ props } = {}) => ({
//   wrapper: mount(
//     <MemoryRouter>{React.cloneElement(render(), props)}</MemoryRouter>
//   )
// });

// export const setupTestComponent = ({
//   render,
//   path: basePath,
//   initialEntries: baseInitialEntries
// } = {}) => ({
//   props,
//   path: testPath,
//   initialEntries: testInitialEntries
// } = {}) => {
//   let history;
//   const path = testPath || basePath || '*';
//   const initialEntries = testInitialEntries || baseInitialEntries || ['/'];

//   return {
//     wrapper: mount(
//       <MemoryRouter initialEntries={initialEntries}>
//         <Route
//           path={path}
//           render={({ history: _history }) => {
//             history = _history;

//             return React.cloneElement(render(), props);
//           }}
//         />
//       </MemoryRouter>
//     ),
//     history
//   };
// };

export const setupTestHook = ({
  hook: baseHook,
  path: basePath,
  initialEntries: baseInitialEntries
} = {}) => ({
  hook: testHook,
  path: testPath,
  initialEntries: testInitialEntries
} = {}) => {
  let history;
  const hook = testHook || baseHook;
  const path = testPath || basePath || '*';
  const initialEntries = testInitialEntries || baseInitialEntries || ['/'];
  const queryClient = new QueryClient();
  const queryCache = new QueryCache();

  queryCache.clear();

  // eslint-disable-next-line react/prop-types
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>
        <Route
          path={path}
          render={({ history: _history }) => {
            history = _history;

            return children;
          }}
        />
      </MemoryRouter>
    </QueryClientProvider>
  );

  return {
    ...reactHooksRenderHook(() => hook(), { wrapper }),
    history
  };
};

export const setupServer = () => {
  const server = mswSetupServer();

  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  const serve = ({ endpoint, status = 200, data, params }) =>
    server.use(
      rest.get(endpoint, (req, res, ctx) => {
        if (params) {
          const query = req.url.searchParams;

          const hasParams = Object.entries(params).every(
            ([key, value]) => query.get(key) === value
          );

          if (!hasParams) {
            return;
          }
        }

        return res.once(ctx.status(status), ctx.json(data));
      })
    );

  return {
    serve
  };
};
