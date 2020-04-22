/* eslint-disable no-console */
import { put, select } from 'redux-saga/effects';
import {
  connectSocket,
  connectToChannelForEvents,
  getAgentId,
  getDomain,
  getToken,
} from './actions';
import { makeSelectSocket } from './selectors';
import { channelActionTypes } from './constants';

/**
 * Will attempt to create a connection to the socket for the given channel,
 * if there is a space parameter in the url will attempt to connect to that space using the same
 * agent and token
 * @param {Function} dispatch - store.dispatch for receiving the callbacks from the channel
 * @param{string} channelName - Name of channel/Topic
 * @param {?Array}  eventArrayMap - [{eventName, eventActionType}, ...] event map to listen to on channel
 * @param{?string} responseActionType - on connection of the channel action type to dispatch to
 * @param showLoading
 * @returns {IterableIterator<*>}
 */
export function* getChannel({
  dispatch,
  channelName,
  eventArrayMap = [],
  responseActionType = channelActionTypes.CHANNEL_JOIN,
  showLoading = false,
}) {
  let socket = yield select(makeSelectSocket());
  if (!socket || !socket.conn) {
    console.info('re-initializing socket', socket);
    const token = yield getToken();
    const agentId = yield getAgentId();
    const domain = yield getDomain();
    const socketConnectionResult = yield put(connectSocket({ dispatch, agentId, token, domain }));
    socket = socketConnectionResult.socket;
  }
  yield put(
    connectToChannelForEvents({
      dispatch,
      channelName,
      eventArrayMap,
      responseActionType,
      socket,
      showLoading,
    }),
  );
  return socket;
}

/**
 * Will attempt to create a connection to the socket for the given channel,
 * if there is a space parameter in the url will attempt to connect to that space using the same
 * agent and token
 * @param {Function} dispatch - store.dispatch for receiving the callbacks from the channel
 * @param{string} channelName - Name of channel/Topic
 * @param{?string} responseActionType - on connection of the channel action type to dispatch to
 * @returns {IterableIterator<*>}
 */
export function* getAnonymousChannel({
  dispatch,
  channelName,
  responseActionType = channelActionTypes.CHANNEL_JOIN,
}) {
  const domain = yield getDomain();
  const socketConnectionResult = yield put(
    connectSocket({ dispatch, useAuthentication: false, domain }),
  );
  const { socket } = socketConnectionResult;
  yield put(
    connectToChannelForEvents({
      dispatch,
      channelName,
      eventArrayMap: [],
      responseActionType,
      socket,
    }),
  );
  return socket;
}
