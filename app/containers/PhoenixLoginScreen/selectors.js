import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the phoenixLoginScreen state domain
 */

const selectPhoenixLoginScreenDomain = (state) => state.phoenixLoginScreen || initialState;

/**
 * Other specific selectors
 */
const makeSelectError = () =>
  createSelector(
    selectPhoenixLoginScreenDomain,
    (substate) => substate.response.error,
  );

const makeSelectWarning = () =>
  createSelector(
    selectPhoenixLoginScreenDomain,
    (substate) => substate.response.warning,
  );

const makeSelectSuccess = () =>
  createSelector(
    selectPhoenixLoginScreenDomain,
    (substate) => substate.response.success,
  );

const makeSelectIsLoggingIn = () =>
  createSelector(
    selectPhoenixLoginScreenDomain,
    (substate) => substate.isLoggingIn,
  );
/**
 * Default selector used by LoginScreen
 */

const makeSelectPhoenixLoginScreen = () =>
  createSelector(
    selectPhoenixLoginScreenDomain,
    (substate) => substate,
  );

export default makeSelectPhoenixLoginScreen;
export {
  selectPhoenixLoginScreenDomain,
  makeSelectError,
  makeSelectIsLoggingIn,
  makeSelectPhoenixLoginScreen,
  makeSelectSuccess,
  makeSelectWarning,
};
