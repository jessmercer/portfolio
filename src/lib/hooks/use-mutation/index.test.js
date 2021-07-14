/* eslint-disable react/prop-types */
import React from 'react';
import { act } from 'react-test-renderer';
import { renderHook } from '@testing-library/react-hooks';
import { setupWrapper, setupServer } from '../../../setupTests';
import useMutation, { services, authApi } from '.';

const { Wrapper } = setupWrapper();
const { serve } = setupServer();

describe('Hooks: use-mutation', () => {
  describe('mutationKeys', () => {
    test('should work with the contact mutation key', async () => {
      const authPromise = serve({
        endpoint: authApi.endpoint,
        method: 'post',
        data: {
          data: {
            token: '123456'
          }
        }
      });
      const contactPromise = serve({
        endpoint: services.contact.endpoint,
        method: 'post'
      });
      const { result, waitForNextUpdate } = renderHook(
        () => useMutation(services.contact),
        { wrapper: ({ children }) => <Wrapper>{children}</Wrapper> }
      );

      await act(async () => {
        result.current.mutate({
          test: 'test',
          test2: 'test2'
        });
      });

      await waitForNextUpdate();

      const auth = await authPromise();
      const contact = await contactPromise();

      expect(
        Array.from(auth.request.body.entries()).reduce(
          (acc, f) => ({ ...acc, [f[0]]: f[1] }),
          {}
        )
      ).toMatchObject({
        password: 'MUe4@(Em3SGJ2$5ucnMIJsc5',
        username: 'Auth'
      });
      expect(contact.request.body).toEqual({ test: 'test', test2: 'test2' });
      expect(contact.request.headers._headers.authorization).toBe(
        'Bearer 123456'
      );
      expect(contact.request.headers._headers['content-type']).toBe(
        'application/json'
      );
      expect(contact.request.headers._headers.accept).toBe('application/json');
      expect(result.current.isSuccess).toBeTruthy();
    });
  });

  test('should work with a different accepted method', async () => {
    serve({
      endpoint: authApi.endpoint,
      method: 'post',
      data: {
        data: {
          token: '123456'
        }
      }
    });
    const contactPromise = serve({
      endpoint: services.contact.endpoint,
      method: 'put'
    });
    const { result, waitForNextUpdate } = renderHook(
      () =>
        useMutation(services.contact, {
          method: 'put'
        }),
      { wrapper: ({ children }) => <Wrapper>{children}</Wrapper> }
    );

    await act(async () => {
      result.current.mutate({
        test: 'test',
        test2: 'test2'
      });
    });

    await waitForNextUpdate();

    const contact = await contactPromise();

    expect(contact.request.method).toBe('PUT');
    expect(contact.request.body).toEqual({ test: 'test', test2: 'test2' });
    expect(result.current.isSuccess).toBeTruthy();
  });

  test('should throw error with a non-accepted method', async () => {
    const { result } = renderHook(
      () =>
        useMutation(services.contact, {
          method: 'foo'
        }),
      {
        wrapper: ({ children }) => <Wrapper>{children}</Wrapper>
      }
    );
    renderHook(
      () =>
        useMutation(services.contact, {
          method: 'foo'
        }),
      { wrapper: ({ children }) => <Wrapper>{children}</Wrapper> }
    );

    expect(result.error).toEqual(new Error('FOO is not an accepted method'));
  });

  test('should throw error with a key that does not exist', async () => {
    const { result } = renderHook(() => useMutation(), {
      wrapper: ({ children }) => <Wrapper>{children}</Wrapper>
    });

    expect(result.error).toEqual(new Error('The query key does not exist'));
  });

  test('should work with useMutationOptions', async () => {
    jest.spyOn(console, 'log');
    serve({
      endpoint: authApi.endpoint,
      method: 'post',
      data: {
        data: {
          token: '123456'
        }
      }
    });
    serve({
      endpoint: services.contact.endpoint,
      method: 'post'
    });

    const { result, waitForNextUpdate } = renderHook(
      () =>
        useMutation(services.contact, {
          useMutationOptions: {
            onSuccess: () => {
              console.log('success');
            }
          }
        }),
      {
        wrapper: ({ children }) => <Wrapper>{children}</Wrapper>
      }
    );

    await act(async () => {
      result.current.mutate();
    });

    await waitForNextUpdate();

    expect(console.log).toHaveBeenCalledWith('success');
  });
});
