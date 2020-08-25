/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import appReducer from './containers/App/reducer';
import { phoenixReducer } from '@trixta/phoenix-to-redux';
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: appReducer,
    phoenix: phoenixReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
