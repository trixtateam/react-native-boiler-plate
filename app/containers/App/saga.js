import { takeLatest, put, select } from 'redux-saga/effects';
import { CHECK_FOR_AUTHENTICATION_TOKEN, SIGN_OUT } from '../App/constants';
import { getLocalStorageItem } from '../../phoenix/utils';
import { PHOENIX_TOKEN } from '../../phoenix/constants';
import { setAuthenticationToken } from './actions';
import { makeSelectSocket } from '../../phoenix/selectors';
import { disconnectSocketAndLogout } from '../../phoenix/actions';

/**
 * Github repos request/response handler
 */
export function* checkForTokenSaga({ dispatch }) {
  try {
    const token = yield getLocalStorageItem(PHOENIX_TOKEN, false);
    yield put(setAuthenticationToken({ dispatch, token }));
  } catch (e) {
    // Restoring token failed
  }
}

/**
 * Github repos request/response handler
 */
export function* signOutSaga({ dispatch }) {
  try {
    const socket = yield select(makeSelectSocket());
    yield disconnectSocketAndLogout({ dispatch, socket });
  } catch (e) {
    // Restoring token failed
  }
}

// Individual exports for testing
export default function* rootScreenSaga() {
  yield takeLatest(CHECK_FOR_AUTHENTICATION_TOKEN, checkForTokenSaga);
  yield takeLatest(SIGN_OUT, signOutSaga);
}
