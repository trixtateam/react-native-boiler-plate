/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createPhoenixChannelMiddleware } from '@trixta/phoenix-to-redux';
import Reactotron from './ReactotronConfig';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
const phoenixChannelMiddleWare = createPhoenixChannelMiddleware();

export default function configureStore(initialState = {}, rootSaga) {
  let composeEnhancers = composeWithDevTools;
  // 1. Reactotron sagaMonitor
  const sagaMonitor = Reactotron.createSagaMonitor();
  const reduxSagaMonitorOptions = __DEV__ ? { sagaMonitor } : {};

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  // Create the store with two middleWares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. phoenixChannelMiddleWare: integrates phoenix channels with redux
  const middleWares = [sagaMiddleware, phoenixChannelMiddleWare];

  const enhancers = [applyMiddleware(...middleWares)];

  if (__DEV__) {
    enhancers.push(Reactotron.createEnhancer());
  }
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
