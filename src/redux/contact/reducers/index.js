import {
  POST_MESSAGE,
  POST_MESSAGE_SUCCESS,
  POST_MESSAGE_ERROR
} from '../actions/types';

export const initialState = {
  isInitial: true,
  isPending: false,
  hasError: false,
  isSuccess: false
};

function contact(state = initialState, { type }) {
  switch (type) {
    case POST_MESSAGE:
      return {
        ...state,
        isPending: true,
        isInitial: false
      };
    case POST_MESSAGE_SUCCESS:
      return {
        ...state,
        isInitial: false,
        isPending: false,
        isSuccess: true
      };
    case POST_MESSAGE_ERROR:
      return {
        ...state,
        isInitial: false,
        isPending: false,
        hasError: true
      };
    default:
      return state;
  }
}

export default contact;
