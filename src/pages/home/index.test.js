import React from 'react';

import { setupTestProvider } from '../../setupTests';
import Home from '.';
import * as homeActions from '../../actions/home-actions';
import * as projectsActions from '../../actions/projects-actions';
import { FETCH_HOME_SUCCESS } from '../../actions/home-actions/types';
import { FETCH_PROJECTS_SUCCESS } from '../../actions/projects-actions/types';
import homeResponse from './test-resources/home-response';
import projectsResponse from './test-resources/projects-response';

jest.spyOn(homeActions, 'requestHome').mockReturnValue(jest.fn());
jest.spyOn(projectsActions, 'requestProjects').mockReturnValue(jest.fn());

const setupTest = setupTestProvider({
  render: () => <Home />
});

const setupTestSuccess = setupTestProvider({
  render: () => <Home />,
  prerender: ({ dispatch }) => {
    dispatch({
      type: FETCH_HOME_SUCCESS,
      data: homeResponse
    });
    dispatch({
      type: FETCH_PROJECTS_SUCCESS,
      data: projectsResponse
    });
  }
});

describe('Pages: Home', () => {
  it('should test', () => {
    const { wrapper } = setupTestSuccess();
    console.log(wrapper.debug());
    expect(true).toBeTruthy()
  });
});

// Describe loading
// renders loader initially (use setupTest)
// renders the loader when home is initial or loading (fire FETCH_PROJECTS_SUCCESS)
// renders the loader when projects is initial or loading (fire FETCH_HOME_SUCCESS)

// Describe error
// renders the error when home has an error
// renders the error when projects has an error

// Describe success
// renders the description
// renders the page header id for header scrolling
// renders the page header


// (within success) Describe projects
// it.each and make sure the following exists:
// renders the link
// renders the image with correct src, alt and sources
// render the correct title