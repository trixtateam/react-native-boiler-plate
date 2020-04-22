import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginScreen state domain
 */

const selectLoginScreenDomain = (state) => state.loginScreen || initialState;
/**
 * Other specific selectors
 */
const makeSelectError = () =>
  createSelector(
    selectLoginScreenDomain,
    (substate) => substate.response.error,
  );

const makeSelectWarning = () =>
  createSelector(
    selectLoginScreenDomain,
    (substate) => substate.response.warning,
  );

const makeSelectSuccess = () =>
  createSelector(
    selectLoginScreenDomain,
    (substate) => substate.response.success,
  );

const makeSelectIsLoggingIn = () =>
  createSelector(
    selectLoginScreenDomain,
    (substate) => substate.isLoggingIn,
  );
/**
 * Default selector used by LoginScreen
 */

const makeSelectLoginScreen = () =>
  createSelector(
    selectLoginScreenDomain,
    (substate) => substate,
  );

export default makeSelectLoginScreen;
export {
  selectLoginScreenDomain,
  makeSelectError,
  makeSelectIsLoggingIn,
  makeSelectLoginScreen,
  makeSelectSuccess,
  makeSelectWarning,
};
