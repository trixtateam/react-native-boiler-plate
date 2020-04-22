/**
 * https://github.com/facebook/react-native
 *
 */
import 'react-native-gesture-handler';
import React from 'react';
import { YellowBox } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import rootSaga from './sagas/index';

import RootStackScreen from './containers/App';

YellowBox.ignoreWarnings(['Require cycle:', 'Warning: Async Storage']);

enableScreens();

const initialState = {};
const store = configureStore(initialState, rootSaga);

export default function App() {
  return (
    <Provider store={store}>
      <RootStackScreen />
    </Provider>
  );
}
