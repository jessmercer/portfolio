import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  POST_MESSAGE,
  POST_MESSAGE_SUCCESS,
  POST_MESSAGE_ERROR
} from './types';

import { postMessageRequest, postMessageApi, authApi } from '.';

describe('Actions: contact', () => {
  describe('postMessageRequest', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    it('creates POST_MESSAGE_SUCCESS when posting message is a success', () => {
      const values = {
        foo: 'foo',
        bar: 'bar'
      };
      const token = 'abc';
      fetchMock
        .postOnce(authApi, {
          body: { data: { token } }
        })
        .postOnce(postMessageApi, {});
      const store = mockStore();

      return store.dispatch(postMessageRequest(values)).then(() => {
        expect(fetchMock._calls[0][0]).toBe(authApi);
        expect(
          Array.from(fetchMock._calls[0][1].body.entries()).reduce(
            (acc, f) => ({ ...acc, [f[0]]: f[1] }),
            {}
          )
        ).toEqual({
          password: 'MUe4@(Em3SGJ2$5ucnMIJsc5',
          username: 'Auth'
        });

        expect(fetchMock._calls[1][0]).toBe(postMessageApi);
        expect(fetchMock._calls[1][1]).toEqual({
          body: '{"foo":"foo","bar":"bar"}',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            accept: 'application/json'
          },
          method: 'POST'
        });

        expect(store.getActions()).toEqual([
          { type: POST_MESSAGE },
          { type: POST_MESSAGE_SUCCESS }
        ]);
      });
    });

    it('creates POST_MESSAGE_ERROR when auth is a failure', () => {
      fetchMock.postOnce(authApi, {
        status: 500
      });
      const store = mockStore();

      return store.dispatch(postMessageRequest()).then(() => {
        expect(store.getActions()).toEqual([
          { type: POST_MESSAGE },
          { type: POST_MESSAGE_ERROR }
        ]);
      });
    });

    it('creates POST_MESSAGE_ERROR when posting message is a failure', () => {
      const token = 'abc';
      fetchMock
        .postOnce(authApi, {
          body: { data: { token } }
        })
        .postOnce(postMessageApi, {
          throws: new Error('error')
        });
      const store = mockStore();

      return store.dispatch(postMessageRequest()).then(() => {
        expect(store.getActions()).toEqual([
          { type: POST_MESSAGE },
          { type: POST_MESSAGE_ERROR }
        ]);
      });
    });
  });
});
