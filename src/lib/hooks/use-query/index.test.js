/* eslint-disable react/prop-types */
import React from 'react';
import * as reactQuery from 'react-query';
import { renderHook } from '@testing-library/react-hooks';
import { setupServer, setupWrapper } from '../../../setupTests';
import useQuery, { services } from '.';

const { serve } = setupServer();
const { Wrapper } = setupWrapper();

const data = {
  message: 'Test'
};

describe('Hooks: use-query', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('queryKeys', () => {
    test('should work with the home query key', async () => {
      serve({
        endpoint: services.home.endpoint,
        data,
        params: services.home.params
      });

      const { result, waitForNextUpdate } = renderHook(
        () => useQuery(services.home),
        { wrapper: ({ children }) => <Wrapper>{children}</Wrapper> }
      );

      await waitForNextUpdate();

      expect(result.current.data).toEqual(data);
    });

    test('should work with the projects query key', async () => {
      serve({
        endpoint: services.projects.endpoint,
        data,
        params: services.projects.params
      });

      const { result, waitForNextUpdate } = renderHook(
        () => useQuery(services.projects),
        { wrapper: ({ children }) => <Wrapper>{children}</Wrapper> }
      );

      await waitForNextUpdate();

      expect(result.current.data).toEqual(data);
    });

    test('should throw error when queryKey does not exist', async () => {
      const { result } = renderHook(() => useQuery(), {
        wrapper: ({ children }) => <Wrapper>{children}</Wrapper>
      });

      expect(result.error).toEqual(new Error('The query key does not exist'));
    });

    test('should work with default react query options', async () => {
      const reactQuerySpy = jest
        .spyOn(reactQuery, 'useQuery')
        .mockImplementation(() => jest.fn());
      renderHook(() => useQuery(services.projects), {
        wrapper: ({ children }) => <Wrapper>{children}</Wrapper>
      });

      expect(reactQuerySpy).toHaveBeenCalledWith(
        services.projects.queryKey,
        expect.any(Function),
        {
          refetchOnWindowFocus: false
        }
      );
    });

    test('should work with useQueryOptions', async () => {
      const reactQuerySpy = jest
        .spyOn(reactQuery, 'useQuery')
        .mockImplementation(() => jest.fn());
      renderHook(
        () =>
          useQuery(services.projects, {
            useQueryOptions: {
              refetchOnWindowFocus: true
            }
          }),
        {
          wrapper: ({ children }) => <Wrapper>{children}</Wrapper>
        }
      );

      expect(reactQuerySpy).toHaveBeenCalledWith(
        services.projects.queryKey,
        expect.any(Function),
        {
          refetchOnWindowFocus: true
        }
      );
    });

    test('should work with options - params', async () => {
      serve({
        endpoint: services.projects.endpoint,
        data,
        params: {
          ...services.projects.params,
          slug: 'project-1'
        }
      });

      const { result, waitForNextUpdate } = renderHook(
        () =>
          useQuery(services.projects, {
            options: {
              params: {
                slug: 'project-1'
              }
            }
          }),
        {
          wrapper: ({ children }) => <Wrapper>{children}</Wrapper>
        }
      );

      await waitForNextUpdate();

      expect(result.current.data).toEqual(data);
    });
  });
});
