import {
  POST_MESSAGE,
  POST_MESSAGE_SUCCESS,
  POST_MESSAGE_ERROR
} from '../actions/types';
import contactReducer, { initialState } from '.';

describe('Reducers: Contact', () => {
  it('should return the initial state', () => {
    expect(contactReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle POST_MESSAGE', () => {
    expect(
      contactReducer(undefined, {
        type: POST_MESSAGE
      })
    ).toEqual({
      ...initialState,
      isInitial: false,
      isPending: true
    });
  });

  it('should handle POST_MESSAGE_SUCCESS', () => {
    expect(
      contactReducer(undefined, {
        type: POST_MESSAGE_SUCCESS
      })
    ).toEqual({
      ...initialState,
      isInitial: false,
      isPending: false,
      isSuccess: true
    });
  });

  it('should handle POST_MESSAGE_ERROR', () => {
    expect(
      contactReducer(undefined, {
        type: POST_MESSAGE_ERROR
      })
    ).toEqual({
      ...initialState,
      isInitial: false,
      isPending: false,
      hasError: true
    });
  });
});
