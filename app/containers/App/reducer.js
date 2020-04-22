/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { isObjectLike } from 'lodash';
import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  SET_AUTHENTICATION_TOKEN,
  UPDATE_LOADING_STATUS,
  END_PROGRESS,
  UPDATE_CURRENT_USER,
  UPDATE_ERROR,
  RESET_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: true,
  loadingStatus: {},
  error: false,
  currentUser: false,
  currentSession: {
    token: false,
    loading: true,
  },
  userData: {
    repositories: false,
  },
};

const appReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case RESET_ERROR:
        draft.error = false;
        break;
      case UPDATE_ERROR:
        draft.error = isObjectLike(action.error) ? JSON.stringify(action.error) : action.error;
        break;
      case UPDATE_LOADING_STATUS:
        draft.loadingStatus[action.data.loadingStatusKey] = { status: true };
        break;
      case UPDATE_CURRENT_USER:
        draft.currentUser = action.data.user;
        draft.currentSession = { loading: false, token: action.data.token };
        break;
      case END_PROGRESS:
        draft.loading = false;
        draft.loadingStatus[action.data.loadingStatusKey] = { status: false };
        break;
      case LOAD_REPOS:
        draft.loading = true;
        draft.error = false;
        draft.userData.repositories = false;
        break;
      case LOAD_REPOS_SUCCESS:
        draft.userData.repositories = action.data.repos;
        draft.loading = false;
        draft.currentUser = action.data.username;
        break;
      case LOAD_REPOS_ERROR:
        draft.error = 'Error loading Repositories. try again.';
        draft.loading = false;
        break;
      case SET_AUTHENTICATION_TOKEN:
        draft.currentSession.token = action.data.token;
        draft.currentSession.loading = false;
    }
  });

export default appReducer;
