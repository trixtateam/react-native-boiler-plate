import { all } from 'redux-saga/effects';
import homeScreenSaga from '../containers/HomeScreen/saga';
import loginScreenSaga from '../containers/LoginScreen/saga';
import phoenixLoginScreenSaga from '../containers/PhoenixLoginScreen/saga';
import rootScreenSaga from '../containers/App/saga';

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    // include container sagas here
    homeScreenSaga(),
    rootScreenSaga(),
    loginScreenSaga(),
    phoenixLoginScreenSaga(),
  ]);
}
