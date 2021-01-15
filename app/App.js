/**
 * https://github.com/facebook/react-native
 *
 */
import 'react-native-gesture-handler';
import React from 'react';
import { YellowBox } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import store from './configureStore';

import RootStackScreen from './containers/App';

YellowBox.ignoreWarnings(['Require cycle:', 'Warning: Async Storage']);

enableScreens();

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

export default function App() {
  return (
    <Provider store={store}>
      <RootStackScreen />
    </Provider>
  );
}
