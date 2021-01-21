// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { put, takeLatest } from 'redux-saga/effects';
import { connectPhoenix, getPhoenixChannel, pushToPhoenixChannel } from '@trixta/phoenix-to-redux';
import {
  DEFAULT_ACTION,
  REQUEST_AUTHENTICATION,
  REQUEST_AUTHENTICATION_FAILURE,
  REQUEST_AUTHENTICATION_SUCCESS,
  REQUEST_AUTHENTICATION_TIME_OUT,
} from './constants';
import { loading, resetError, updateCurrentUser, updateError } from '../App/actions';
import { get } from 'lodash';
import { requestAuthenticationFailed } from './actions';
import { setLocalStorageItem } from '../../utils/helpers';
import { socketChannels, socketEvents } from '../../phoenix/constants';
import { PHOENIX_DOMAIN, PHOENIX_TOKEN, PHOENIX_AGENT } from '../App/constants';

export function* loginSaga({ data }) {
  try {
    yield put(loading({}));
    const domainUrl = get(data, 'domain', '');
    const channelTopic = socketChannels.AUTHENTICATION;
    setLocalStorageItem(PHOENIX_DOMAIN, domainUrl);
    yield put(connectPhoenix({ domainUrl }));
    yield put(
      getPhoenixChannel({
        domainUrl,
        channelTopic,
      }),
    );
    yield put(
      pushToPhoenixChannel({
        channelTopic,
        eventName: socketEvents.LOGIN,
        channelResponseEvent: REQUEST_AUTHENTICATION_SUCCESS,
        channelErrorResponseEvent: REQUEST_AUTHENTICATION_FAILURE,
        requestData: data,
        additionalData: { domainUrl },
        dispatchChannelError: false,
        channelTimeOutEvent: REQUEST_AUTHENTICATION_TIME_OUT,
        channelPushTimeOut: 5000,
      }),
    );
  } catch (error) {
    yield put(requestAuthenticationFailed({ error: error.toString() }));
    yield put(updateError({ error: error.toString() }));
  }
}

export function* handleLoginTimeoutSaga() {
  yield put(
    updateError({
      error: 'Server is taking longer than expected to respond. Please try again later .',
    }),
  );
}

export function* handleLoginSuccessSaga({ data }) {
  if (data) {
    const domainUrl = get(data, 'domainUrl', '');
    const agentId = get(data, 'agent_id', '');
    const token = get(data, 'jwt', '');
    setLocalStorageItem(PHOENIX_TOKEN, token);
    setLocalStorageItem(PHOENIX_AGENT, agentId);
    yield put(updateCurrentUser({ agentId, token }));
    yield put(connectPhoenix({ params: { token, agent_id: agentId }, domainUrl }));
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

export default function* phoenixLoginScreenSaga() {
  // See example in containers/HomeScreen/saga.js
  yield takeLatest(REQUEST_AUTHENTICATION, loginSaga);
  yield takeLatest(REQUEST_AUTHENTICATION_TIME_OUT, handleLoginTimeoutSaga);
  yield takeLatest(REQUEST_AUTHENTICATION_SUCCESS, handleLoginSuccessSaga);
  yield takeLatest(REQUEST_AUTHENTICATION_FAILURE, handleLoginFailureSaga);
  yield takeLatest(DEFAULT_ACTION, handleDefaultActionSaga);
}
