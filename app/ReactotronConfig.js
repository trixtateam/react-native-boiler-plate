import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import AsyncStorage from '@react-native-community/async-storage';
const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({ name: 'Trixta Boiler Plate' }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux())
  .use(sagaPlugin()) //  <- here i am!
  .connect(); //Don't forget about me!

export default reactotron;
