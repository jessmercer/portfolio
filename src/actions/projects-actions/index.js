import { prependRequest } from '../../lib/constants';
import {
  FETCH_PROJECTS,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_ERROR
} from './types';

function fetchProjecst() {
  return {
    type: FETCH_PROJECTS
  };
}

function fetchProjectsSuccess(data) {
  return {
    type: FETCH_PROJECTS_SUCCESS,
    data
  };
}

function fetchProjectsError() {
  return {
    type: FETCH_PROJECTS_ERROR
  };
}

export const requestProjectsApi =
  `${prependRequest}http://www.boggonbone.co.uk/api/wp-json/wp/v2/project?_fields=title,acf,slug`;

export function requestProjects() {
  return dispatch => {
    dispatch(fetchProjecst());
    return fetch(requestProjectsApi)
      .then(response => response.json())
      .then(
        data => dispatch(fetchProjectsSuccess(data)),
        () => dispatch(fetchProjectsError())
      );
  };
}
