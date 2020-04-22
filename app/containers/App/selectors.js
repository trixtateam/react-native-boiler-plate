/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = (state) => state.global || initialState;
const selectError = (state) => state.global.error;
const selectLoading = (state) => state.global.loading;
const selectLoadingStatus = (state) => state.global.loadingStatus;
const selectLoadingStatusForKey = (state, props) =>
  state.global.loadingStatus &&
  state.global.loadingStatus[props.loadingStatusKey] &&
  state.global.loadingStatus[props.loadingStatusKey];
const selectRepositories = (state) => state.global.userData.repositories;
const selectUserData = (state) => state.global.userData;

const makeSelectLoading = () =>
  createSelector(
    selectLoading,
    (loading) => loading,
  );

const makeSelectLoadingStatusForKey = () =>
  createSelector(
    selectLoadingStatusForKey,
    (status) => status,
  );

const makeSelectLoadingStatus = () =>
  createSelector(
    selectLoadingStatus,
    (status) => status,
  );

const makeSelectError = () =>
  createSelector(
    selectError,
    (error) => error,
  );

const makeSelectRepos = () => {
  return createSelector(
    selectRepositories,
    (repositories) => repositories,
  );
};

const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    (substate) => substate.currentUser,
  );

const makeSelectCurrentSession = () =>
  createSelector(
    selectGlobal,
    (substate) => substate.currentSession,
  );

const makeSelectCurrentSessionToken = () =>
  createSelector(
    selectGlobal,
    (substate) => substate.currentSession.token,
  );

export {
  selectGlobal,
  selectUserData,
  selectRepositories,
  selectLoadingStatus,
  selectError,
  selectLoading,
  selectLoadingStatusForKey,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectCurrentSession,
  makeSelectCurrentSessionToken,
  makeSelectCurrentUser,
  makeSelectLoadingStatus,
  makeSelectLoadingStatusForKey,
};
