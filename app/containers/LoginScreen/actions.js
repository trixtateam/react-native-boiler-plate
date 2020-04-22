/*
 *
 * LoginScreen actions
 *
 */

import {
  DEFAULT_ACTION,
  REQUEST_AUTHENTICATION,
  REQUEST_AUTHENTICATION_FAILURE,
  REQUEST_AUTHENTICATION_SUCCESS,
  UPDATE_AUTHENTICATION_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function requestAuthentication({ dispatch, data }) {
  return {
    type: REQUEST_AUTHENTICATION,
    dispatch,
    data,
  };
}

export function requestAuthenticationSuccess({ dispatch, data }) {
  return {
    type: REQUEST_AUTHENTICATION_SUCCESS,
    dispatch,
    data,
  };
}

export function requestAuthenticationFailed({ error }) {
  return {
    type: REQUEST_AUTHENTICATION_FAILURE,
    error,
  };
}

export function updateAuthenticationError({ error }) {
  return {
    type: UPDATE_AUTHENTICATION_ERROR,
    error,
  };
}
