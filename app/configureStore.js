/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createPhoenixChannelMiddleware } from '@trixta/phoenix-to-redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
const phoenixChannelMiddleWare = createPhoenixChannelMiddleware();

export default function configureStore(initialState = {}, rootSaga) {
  let composeEnhancers = composeWithDevTools;
  const reduxSagaMonitorOptions = {};

  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
    }

    // NOTE: Uncomment the code below to restore support for Redux Saga
    // Dev Tools once it supports redux-saga version 1.x.x
    // if (window.__SAGA_MONITOR_EXTENSION__)
    //   reduxSagaMonitorOptions = {
    //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
    //   };
  }

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  // Create the store with two middleWares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. phoenixChannelMiddleWare: integrates phoenix channels with redux
  const middleWares = [sagaMiddleware, phoenixChannelMiddleWare];

  const enhancers = [applyMiddleware(...middleWares)];

  const store = createStore(createReducer(), initialState, composeEnhancers(...enhancers));
  // Extensions
  // Kick off the root saga
  sagaMiddleware.run(rootSaga);
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  //Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
