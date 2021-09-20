import React from 'react';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer as mswSetupServer } from 'msw/node';
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  setLogger
} from 'react-query';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';

process.env = Object.assign(process.env, {
  REACT_APP_AUTH_USERNAME: 'username',
  REACT_APP_AUTH_PASSWORD: 'password'
});

export const setupWrapper = ({ path, location } = {}) => {
  let history = createMemoryHistory();
  const queryClient = new QueryClient();
  const queryCache = new QueryCache();

  afterEach(() => {
    queryCache.clear();
  });

  history.push(location);

  // eslint-disable-next-line react/prop-types
  const Wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <Router history={history}>
        <Route path={path || '*'}>{children}</Route>
      </Router>
    </QueryClientProvider>
  );

  return {
    Wrapper,
    history
  };
};

export const setupServer = () => {
  const server = mswSetupServer();

  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
    setLogger({
      log: () => {},
      warn: () => {},
      error: () => {}
    });
  });

  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  const serve = ({ endpoint, status = 200, data, params, method = 'get' }) => {
    if (!endpoint) {
      return;
    }

    let request = null;

    const promise = new Promise((resolve) => {
      server.use(
        rest[method](endpoint, (req, res, ctx) => {
          request = req;
          if (params) {
            const reqParams = Array.from(req.url.searchParams.entries());
            const doReqParamsExist = reqParams.every(
              ([key, value]) => params[key] === value
            );
            const hasMatchingParamsLength =
              reqParams.length === Object.keys(params).length;

            if (!doReqParamsExist || !hasMatchingParamsLength) {
              return;
            }
          }

          resolve({ request, response: data });

          return res.once(ctx.status(status), ctx.json(data), ctx.delay(10));
        })
      );
    });

    return () => promise;
  };

  return {
    serve
  };
};
