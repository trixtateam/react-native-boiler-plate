// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { put, select, takeLatest } from 'redux-saga/effects';
import {
  DEFAULT_ACTION,
  REQUEST_AUTHENTICATION,
  REQUEST_AUTHENTICATION_FAILURE,
  REQUEST_AUTHENTICATION_SUCCESS,
  REQUEST_AUTHENTICATION_TIME_OUT,
} from './constants';
import {
  AGENT_ID,
  PHOENIX_TOKEN,
  SOCKET_DOMAIN,
  socketChannels,
  socketEvents,
} from '../../phoenix/constants';
import { loading, resetError, updateCurrentUser, updateError } from '../App/actions';
import { get } from 'lodash';
import { formatSocketDomain, setLocalStorageItem } from '../../phoenix/utils';
import { getAnonymousChannel } from '../../phoenix/socketSagas';
import { connectSocket, disconnectSocket, pushToChannel } from '../../phoenix/actions';
import { requestAuthenticationFailed } from './actions';
import { makeSelectSocket } from '../../phoenix/selectors';

export function* loginSaga({ dispatch, data }) {
  try {
    const channelName = socketChannels.AUTHENTICATION;
    yield put(loading({}));
    const domainDetails = get(data, 'domain', '');
    const domain = formatSocketDomain({ domainString: domainDetails });
    yield setLocalStorageItem(SOCKET_DOMAIN, domain);
    const socket = yield getAnonymousChannel({ dispatch, channelName });
    yield pushToChannel({
      dispatch,
      channelName,
      eventName: socketEvents.LOGIN,
      customOKResponseEvent: REQUEST_AUTHENTICATION_SUCCESS,
      customErrorResponseEvent: REQUEST_AUTHENTICATION_FAILURE,
      requestData: data,
      extraData: { domain },
      socket,
      dispatchGlobalError: false,
      customTimeoutEvent: REQUEST_AUTHENTICATION_TIME_OUT,
      defaultTimeout: 5000,
    });
  } catch (error) {
    yield put(requestAuthenticationFailed({ error: error.toString() }));
    yield put(updateError({ error: error.toString() }));
  }
}

export function* handleLoginTimeoutSaga({ dispatch }) {
  yield put(
    updateError({
      error: 'Server is taking longer than expected to respond. Please try again later .',
    }),
  );
}

export function* handleLoginSuccessSaga({ data, dispatch }) {
  if (data) {
    const domain = get(data, 'domain', '');
    const agentId = get(data, 'agent_id', '');
    const token = get(data, 'jwt', '');
    const roles = get(data, 'role_ids', '');
    yield setLocalStorageItem(PHOENIX_TOKEN, token);
    yield setLocalStorageItem(AGENT_ID, agentId);
    yield put(updateCurrentUser({ agentId, token, roles, dispatch }));
    const socket = yield select(makeSelectSocket());
    disconnectSocket(socket);
    yield put(connectSocket({ dispatch, agentId, token, domain }));
  }
}

export function* handleLoginFailureSaga({ error, dispatch }) {
  yield put(
    updateError({
      error: get(error, 'reason', 'Authentication Failed'),
    }),
  );
}

export function* handleDefaultActionSaga({ dispatch }) {
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
