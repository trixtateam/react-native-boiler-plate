## Removing `phoenix`

**app/configureStore.js**

1.  Remove statement `import { createPhoenixChannelMiddleware } from '@trixta/phoenix-to-redux';`.
2.  Remove statement `const phoenixChannelMiddleWare = createPhoenixChannelMiddleware();`.
3.  Remove `phoenixChannelMiddleWare` from `middlewares` array.

**app/reducers.js**

1.  Remove statement `import { phoenixReducer } from '@trixta/phoenix-to-redux';`.
2.  Remove statement `phoenix: phoenixReducer,`.

**app/containers/App/saga.js**

1. remove phoenix saga listeners and functions from `rootScreenSaga`

**app/containers/PhoenixLoginScreen/**

1. Delete entire folder

**app/navigators/AuthenticationScreenStack.js**

1. Remove `AuthenticationTabs.Screen` section related to PhoenixLoginScreen


**Finally, remove it from the `package.json`.

1.  Remove `@trixta/phoenix-to-redux` from `dependencies`
2.  Remove `phoenix` from `dependencies`


## Removing `redux-saga`

**We don't recommend removing `redux-saga`**, as we strongly feel that it's the
way to go for most redux based applications.

If you really want to get rid of it, you will have to remove its presence from several places.

**app/configureStore.js**

1.  Remove statement `import createSagaMiddleware from 'redux-saga'`.
2.  Remove statement `const sagaMiddleware = createSagaMiddleware()`.
3.  Remove `sagaMiddleware` from `middlewares` array.
4.  Remove statement `store.runSaga = sagaMiddleware.run`
5.  Remove `store.injectedSagas = {}; // Saga registry`

**app/tests/store.test.js**

1.  Remove describe block and tests for `injectSagas`
2.  Remove describe block and tests for `runSaga`

**app/utils**

1.  Remove three files: `injectSaga.js`, `sagaInjectors.js`, and `constants.js`.

**app/utils/checkStore.js**

1.  Remove `runSaga: isFunction,`
2.  Remove `injectedSagas: isObject,`

**app/utils/tests**

1.  Remove two files: `injectSaga.test.js` and `sagaInjectors.test.js`

**app/utils/tests/checkStore.test.js**

1.  Remove `expect(() => checkStore({ ...store, injectedSagas: null })).toThrow();`
2.  Remove `expect(() => checkStore({ ...store, runSaga: null })).toThrow();`

**app/sagas/index.js**

Clean up screen sagas

**Finally, remove it from the `package.json`. Then you should be good to go with whatever
side-effect management library you want to use!**

1.  Remove `redux-saga` from `dependencies`
2.  Remove `eslint-plugin-redux-saga` from `devDependencies`
3.  Remove `eslintConfig > plugins > redux-saga`
4.  Remove `eslintConfig > rules > redux-saga/*`

## Removing `reselect`

To remove `reselect`, remove it from your dependencies in `package.json` and then write
your `mapStateToProps` functions like you normally would!

## Removing `reactotron`

**app/configureStore.js**
1.  Remove statement `import Reactotron from './ReactotronConfig';`.
2.  Remove statement `const sagaMonitor = Reactotron.createSagaMonitor();`.
3.  Remove statement `enhancers.push(Reactotron.createEnhancer())`.

**app/ReactotronConfig.js**

1.  Delete file.

**app/App.js**
1.  Remove statement `import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));`.

**Finally, remove it from the `package.json`.

1.  Remove `reactotron-react-native` from `dependencies`
2.  Remove `reactotron-redux` from `dependencies`
3.  Remove `reactotron-redux-saga` from `dependencies`
