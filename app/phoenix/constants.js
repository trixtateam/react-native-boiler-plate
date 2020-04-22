export const socketActionTypes = {
  SOCKET_OPEN: 'SOCKET_OPEN',
  SOCKET_CLOSE: 'SOCKET_CLOSE',
  SOCKET_ERROR: 'SOCKET_ERROR',
  SOCKET_CONNECT: 'SOCKET_CONNECT',
  SOCKET_DISCONNECT: 'SOCKET_DISCONNECT',
};

export const channelActionTypes = {
  CHANNEL_JOIN: 'CHANNEL_JOIN',
  CHANNEL_LEAVE: 'CHANNEL_LEAVE',
  CHANNEL_PUSH: 'CHANNEL_PUSH',
  CHANNEL_PUSH_ERROR: 'CHANNEL_PUSH_ERROR',
  CHANNEL_ERROR: 'CHANNEL_ERROR',
  CHANNEL_TIMEOUT: 'CHANNEL_TIMEOUT',
  CHANNEL_PRESENCE_UPDATE: 'CHANNEL_PRESENCE_UPDATE',
};

// for cases when outputting an action to the reducer is not valid
export const NO_ACTION = 'NO_ACTION';

export const socketStatuses = {
  CONNECTING: 'CONNECTING',
  CONNECTED: 'CONNECTED',
  OPEN: 'OPEN',
  CLOSING: 'CLOSING',
  CLOSED: 'CLOSED',
  DISCONNECTED: 'DISCONNECTED',
  ERROR: 'ERROR',
};

export const channelStatuses = {
  CHANNEL_OK: 'ok',
  CHANNEL_TIMEOUT: 'timeout',
  CHANNEL_ERROR: 'error',
  CHANNEL_JOINED: 'joined',
};

export const phoenixChannelStatuses = {
  CHANNEL_OK: 'ok',
  CHANNEL_TIMEOUT: 'timeout',
  CHANNEL_PRESENCE_STATE: 'presence_state',
  CHANNEL_PRESENCE_CHANGE: 'presence_diff',
  CHANNEL_ERROR: 'error',
};

export const phoenixSocketStatuses = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
};

export const CHANNEL_NAME_PREFIX = 'space:';
export const PHOENIX_TOKEN = 'Phoenix_token';
export const SOCKET_DOMAIN = 'Socket_Domain';
export const AGENT_ID = 'Phoenix_agentId';
export const SOCKET_URI = 'socket';
export const SOCKET_PROTOCOL_SECURE = 'wss:';
export const SOCKET_PROTOCOL_UN_SECURE = 'ws:';

export const socketChannels = {
  AUTHENTICATION: 'session',
  LOBBY: 'lobby',
  SPACE: 'space',
};

export const socketEvents = {
  LOGIN: 'login',
};

export const DEFAULT_DOMAIN = 'analytics.test.trixta.io';
