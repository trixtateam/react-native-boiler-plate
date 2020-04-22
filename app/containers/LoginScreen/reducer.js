/*
 *
 * LoginScreen reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  REQUEST_AUTHENTICATION,
  REQUEST_AUTHENTICATION_FAILURE,
  REQUEST_AUTHENTICATION_SUCCESS,
  REQUEST_AUTHENTICATION_TIME_OUT,
} from './constants';

export const initialState = {
  response: {
    error: false,
    success: false,
    warning: false,
  },
  isLoggingIn: false,
};

const loginScreenReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        return initialState;
      case REQUEST_AUTHENTICATION:
        draft.isLoggingIn = true;
        break;
      case REQUEST_AUTHENTICATION_FAILURE:
        draft.error = action.error;
        draft.isLoggingIn = false;
        break;
      case REQUEST_AUTHENTICATION_SUCCESS:
        draft.isLoggingIn = false;
        draft.success = 'Successfully logged in';
        break;
      case REQUEST_AUTHENTICATION_TIME_OUT:
        draft.isLoggingIn = false;
        draft.error = action.error;
        break;
    }
  });

export default loginScreenReducer;
