import { takeLatest, put, delay } from 'redux-saga/effects';
import { get } from 'lodash';
import {
  DEFAULT_ACTION,
  REQUEST_AUTHENTICATION,
  REQUEST_AUTHENTICATION_FAILURE,
  REQUEST_AUTHENTICATION_SUCCESS,
} from './constants';
import {
  loading,
  resetError,
  setAuthenticationToken,
  updateCurrentUser,
  updateError,
} from '../App/actions';
import { requestAuthenticationFailed, requestAuthenticationSuccess } from './actions';
import { setLocalStorageItem } from '../../utils/helpers';
import { PHOENIX_TOKEN } from '../App/constants';

export function* loginSaga({ dispatch, data }) {
  try {
    yield put(loading({}));
    // cause a delay for testing purposes
    yield delay(5000);
    yield put(requestAuthenticationSuccess({ dispatch, data }));
  } catch (error) {
    yield put(requestAuthenticationFailed({ error: error.toString() }));
    yield put(updateError({ error: error.toString() }));
  }
}

export function* handleLoginSuccessSaga({ data }) {
  if (data) {
    yield setLocalStorageItem(PHOENIX_TOKEN, data.identity);
    yield put(updateCurrentUser({ agentId: data.identity, token: true }));
    yield put(setAuthenticationToken({ token: true }));
  }
}

export function* handleLoginFailureSaga({ error }) {
  yield put(
    updateError({
      error: get(error, 'reason', 'Authentication Failed'),
    }),
  );
}

export function* handleDefaultActionSaga() {
  yield put(resetError());
}
// Individual exports for testing
export default function* loginScreenSaga() {
  // See example in containers/HomeScreen/saga.js
  yield takeLatest(REQUEST_AUTHENTICATION, loginSaga);
  yield takeLatest(REQUEST_AUTHENTICATION_SUCCESS, handleLoginSuccessSaga);
  yield takeLatest(REQUEST_AUTHENTICATION_FAILURE, handleLoginFailureSaga);
  yield takeLatest(DEFAULT_ACTION, handleDefaultActionSaga);
}
