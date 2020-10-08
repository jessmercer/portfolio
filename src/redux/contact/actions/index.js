import { api } from "../../../lib/constants";

import {
  FETCH_CONTACT,
  FETCH_CONTACT_SUCCESS,
  FETCH_CONTACT_ERROR,
  POST_MESSAGE,
  POST_MESSAGE_SUCCESS,
  POST_MESSAGE_ERROR
} from "./types";

function fetchContact() {
  return {
    type: FETCH_CONTACT
  };
}

function fetchContactSuccess(data) {
  return {
    type: FETCH_CONTACT_SUCCESS,
    data
  };
}

function fetchContactError() {
  return {
    type: FETCH_CONTACT_ERROR
  };
}

export const requestContactApi = `${api}/pages?slug=jess-contact&_fields=acf`;

export function requestContact() {
  return (dispatch) => {
    dispatch(fetchContact());
    return fetch(requestContactApi)
      .then((response) => response.json())
      .then(
        (data) => dispatch(fetchContactSuccess(data)),
        () => dispatch(fetchContactError())
      );
  };
}

function postMessage() {
  return {
    type: POST_MESSAGE
  };
}

function postMessageSuccess(data) {
  return {
    type: POST_MESSAGE_SUCCESS,
    data
  };
}

function postMessageError() {
  return {
    type: POST_MESSAGE_ERROR
  };
}

export const authApi = `${api}/jess_message`;
export const postMessageApi = `${api}/jwt-auth/v1/token`;

export function postMessageRequest(values) {
  return (dispatch) => {
    dispatch(postMessage());
    return fetch(authApi)
      .then(({ token }) =>
        fetch(postMessageApi, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            Authorization: `Bearer: ${token}`
          }
        })
      )
      .then((response) => response.json())
      .then(
        (data) => dispatch(postMessageSuccess(data)),
        () => dispatch(postMessageError())
      );
  };
}
