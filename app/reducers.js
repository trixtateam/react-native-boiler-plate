/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import appReducer from './containers/App/reducer';
import socketReducer from './phoenix/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: appReducer,
    phoenix: socketReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
