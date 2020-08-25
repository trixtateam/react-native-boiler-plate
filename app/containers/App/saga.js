import { takeLatest, put, select, takeEvery } from 'redux-saga/effects';
import {
  connectPhoenix,
  disconnectPhoenix,
  socketActionTypes,
  channelActionTypes,
  makeSelectPhoenixSocket,
} from '@trixta/phoenix-to-redux';
import {
  CHECK_FOR_AUTHENTICATION_TOKEN,
  SIGN_OUT,
  PHOENIX_TOKEN,
  PHOENIX_AGENT,
  PHOENIX_DOMAIN,
  SET_AUTHENTICATION_TOKEN,
} from '../App/constants';
import { setAuthenticationToken, updateError } from './actions';
import { getLocalStorageItem, removeLocalStorageItem } from '../../utils/helpers';
import { makeSelectCurrentSession } from './selectors';

/**
 *
 * Checks for saved authentication details
 */
export function* checkForTokenSaga() {
  try {
    const token = yield getLocalStorageItem(PHOENIX_TOKEN, false);
    yield put(setAuthenticationToken({ token }));
  } catch (e) {
    // Restoring token failed
  }
}

export function* signOutSaga() {
  try {
    const socket = yield select(makeSelectPhoenixSocket());
    if (socket) {
      yield put(disconnectPhoenix());
    } else {
      yield removeLocalStorageItem(PHOENIX_TOKEN);
      yield removeLocalStorageItem(PHOENIX_AGENT);
      yield removeLocalStorageItem(PHOENIX_DOMAIN);
      yield put(setAuthenticationToken({ token: false }));
    }
  } catch (e) {
    // Restoring token failed
  }
}

export function* connectToPhoenixSaga({ data }) {
  if (data.token && data.token !== false) {
    const agentId = yield getLocalStorageItem(PHOENIX_AGENT);
    const domainUrl = yield getLocalStorageItem(PHOENIX_DOMAIN);
    const token = data.token;
    yield put(connectPhoenix({ token, agentId, domainUrl }));
  }
}

/**
 * When a socket disconnection happens
 * and redirect to login page
 */
export function* socketDisconnectionSaga({ isAnonymous }) {
  if (!isAnonymous) {
    yield removeLocalStorageItem(PHOENIX_DOMAIN);
    yield removeLocalStorageItem(PHOENIX_TOKEN);
    yield removeLocalStorageItem(PHOENIX_AGENT);
    yield put(setAuthenticationToken({ token: false }));
  }
}

/**
 * After the socket is connected,
 * @param {*} params
 */
export function* socketConnectedSaga({ isAnonymous }) {
  // handle connection response
  const currentSession = yield select(makeSelectCurrentSession());
  if (!isAnonymous) {
    yield put(setAuthenticationToken({ token: currentSession.token }));
  }
}

/**
 * If an error happens on joining a phoenix channel
 * @param {Object} params
 * @param {Object} params.error - error response
 * @param {string} params.channelTopic - name of phoenix channel
 */
export function* channelJoinErrorSaga({ error, channelTopic }) {
  console.error(error, channelTopic);
  yield put(updateError({ error }));
}

/**
 * If an error happens on a phoenix channel
 * @param {Object} params
 * @param {Object} params.error - error response
 * @param {string} params.channelTopic - name of phoenix channel
 */
export function* channelErrorSaga({ error }) {
  yield put(updateError({ error }));
}

/**
 * After joining a phoenix channel
 * @param response
 * @param channel
 * @returns {IterableIterator<*>}
 */
export function* handleChannelJoinSaga(data) {
  console.info('handleChannelJoinSaga', data);
}

// Individual exports for testing
export default function* rootScreenSaga() {
  yield takeLatest(CHECK_FOR_AUTHENTICATION_TOKEN, checkForTokenSaga);
  yield takeLatest(SIGN_OUT, signOutSaga);
  yield takeEvery(socketActionTypes.SOCKET_DISCONNECT, socketDisconnectionSaga);
  yield takeEvery(socketActionTypes.SOCKET_OPEN, socketConnectedSaga);
  yield takeEvery(channelActionTypes.CHANNEL_PUSH_ERROR, channelErrorSaga);
  yield takeEvery(channelActionTypes.CHANNEL_JOIN_ERROR, channelJoinErrorSaga);
  yield takeEvery(channelActionTypes.CHANNEL_JOIN, handleChannelJoinSaga);
  yield takeLatest(SET_AUTHENTICATION_TOKEN, connectToPhoenixSaga);
}
