import React from 'react';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer as mswSetupServer } from 'msw/node';
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';

export const setupWrapper = ({ path, initialEntries } = {}) => {
  const history = createMemoryHistory();
  const queryClient = new QueryClient();
  const queryCache = new QueryCache();

  queryCache.clear();

  // eslint-disable-next-line react/prop-types
  const Wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <Router history={history} initialEntries={initialEntries || ['/']}>
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
    server.listen();
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

    let request;

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

          resolve({ request });

          return res.once(ctx.status(status), ctx.json(data));
        })
      );
    });

    return () => promise;
  };

  return {
    serve
  };
};
