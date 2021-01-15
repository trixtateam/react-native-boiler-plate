/**
 * Create the store with dynamic reducers
 */
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createInjectorsEnhancer } from 'redux-injectors';
import { createPhoenixChannelMiddleware } from '@trixta/phoenix-to-redux';
import Reactotron from './ReactotronConfig';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
export function configureAppStore(initialState = {}) {
  // 1. Reactotron sagaMonitor
  const sagaMonitor = Reactotron.createSagaMonitor();
  const reduxSagaMonitorOptions = __DEV__ ? { sagaMonitor } : {};
  const phoenixChannelMiddleWare = createPhoenixChannelMiddleware();
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;
  // Create the store with two middleWares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. phoenixChannelMiddleWare: integrates phoenix channels with redux
  const middlewares = [phoenixChannelMiddleWare, sagaMiddleware];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ];

  if (__DEV__) {
    enhancers.push(Reactotron.createEnhancer());
  }
  const store = configureStore({
    preloadedState: initialState,
    reducer: createReducer(),
    middleware: [
      ...getDefaultMiddleware({
        thunk: false,
        immutableCheck: {
          ignore: ['socket', 'channel', 'trixta', 'phoenix', 'router'],
        },
        serializableCheck: false,
      }),
      ...middlewares,
    ],
    devTools: process.env.NODE_ENV !== 'production',
    enhancers,
  });

  return store;
}

const store = configureAppStore({});
export default store;
