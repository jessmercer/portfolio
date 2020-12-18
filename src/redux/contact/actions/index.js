import { api } from '../../../lib/constants';

import {
  POST_MESSAGE,
  POST_MESSAGE_SUCCESS,
  POST_MESSAGE_ERROR
} from './types';

function postMessage() {
  return {
    type: POST_MESSAGE
  };
}

function postMessageSuccess() {
  return {
    type: POST_MESSAGE_SUCCESS
  };
}

function postMessageError() {
  return {
    type: POST_MESSAGE_ERROR
  };
}

export const authApi = `${api}/jwt-auth/v1/token`;
export const postMessageApi = `${api}/wp/v2/jess_message`;

export function postMessageRequest(values) {
  return (dispatch) => {
    dispatch(postMessage());
    const formData = new FormData();
    formData.append('username', 'Auth');
    formData.append('password', 'MUe4@(Em3SGJ2$5ucnMIJsc5');

    return fetch(authApi, {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then(({ data: { token } = {} } = {}) =>
        fetch(postMessageApi, {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            accept: 'application/json'
          }
        })
          .then(() => dispatch(postMessageSuccess()))
          .catch(() => dispatch(postMessageError()))
      )
      .catch(() => dispatch(postMessageError()));
  };
}
