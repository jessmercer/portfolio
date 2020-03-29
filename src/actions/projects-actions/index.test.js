import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  FETCH_PROJECTS,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_ERROR
} from './types';

import { requestProjects, requestProjectsApi } from '.';

describe('Actions: projects', () => {
  describe('requestProjects', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    it('creates FETCH_PROJECTS_SUCCESS when fetching projects is a success', () => {
      fetchMock.getOnce(requestProjectsApi, {
        body: { test: 'test' },
        headers: { 'content-type': 'application/json' }
      });
      const store = mockStore({ projects: [] });

      return store.dispatch(requestProjects()).then(() => {
        expect(store.getActions()).toEqual([
          { type: FETCH_PROJECTS },
          { type: FETCH_PROJECTS_SUCCESS, data: { test: 'test' } }
        ]);
      });
    });

    it('creates FETCH_PROJECTS_ERROR when fetching projects is a failure', () => {
      fetchMock.getOnce(requestProjectsApi, {
        headers: { 'content-type': 'application/json' }
      });
      const store = mockStore({ authors: [] });

      return store.dispatch(requestProjects()).then(() => {
        expect(store.getActions()).toEqual([
          { type: FETCH_PROJECTS },
          { type: FETCH_PROJECTS_ERROR }
        ]);
      });
    });
  });
});
