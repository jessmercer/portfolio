import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import nock from 'nock';
import { renderHook } from '@testing-library/react-hooks';
// import { rest, setupWorker } from 'msw';
// import { act, create, ReactTestRenderer } from 'react-test-renderer';

import useQuery, { queryKeys } from '.';

const queryClient = new QueryClient();

describe('Hooks: use-query', () => {
  describe('queryKeys', () => {
    it('should work with the home query key', async () => {
      const wrapper = ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );

      nock('https://boggon.uk')
        .get('/wp-json/wp/v2/pages?slug=jess-home&_fields=acf')
        .reply(200, {
          answer: 42
        });

      const { result, waitFor } = renderHook(() => useQuery(), { wrapper });

      await waitFor(() => result.current.isSuccess);

      expect(result.current).toEqual({ answer: 42 });
    });
  });
});
