import { isNull, isUndefined, isEmpty, isArray, startsWith, isObject } from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';
import { SOCKET_PROTOCOL_SECURE, SOCKET_PROTOCOL_UN_SECURE, SOCKET_URI } from './constants';

/**
 * Searches the object and returns the value associated for the given parameterName
 * @param{Object} search - search object of the location
 * @param{string} parameterName - name of parameter
 * @param defaultValue - default value to return if not found
 * @returns {string}
 */
function getUrlParameter({ search, parameterName, defaultValue = '' }) {
  // eslint-disable-next-line no-useless-escape
  const parameter = parameterName.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[\\?&]${parameter}=([^&#]*)`);
  const results = regex.exec(search);
  return results === null ? defaultValue : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/**
 * Returns true if the value is null or undefined or empty
 * @param value
 * @returns {boolean}
 */
function isNullOrEmpty(value) {
  if (isNull(value)) {
    return true;
  }
  if (isUndefined(value)) {
    return true;
  }
  if (isArray(value) && isEmpty(value)) {
    return true;
  }
  if (!Number.isInteger(value) && Object.keys(value).length === 0) {
    return true;
  }
  if (value.length === 0) {
    return true;
  }

  return false;
}

/* Gets a local storage value for the given and returns the defaultValue if not found
 * @param key
 * @param defaultValue
 * @returns {string|*}
 */
async function getLocalStorageItem(key, defaultValue = null) {
  const localStorageValue = await AsyncStorage.getItem(key);
  if (isNullOrEmpty(localStorageValue)) {
    return defaultValue;
  }

  if (isJsonString(localStorageValue)) {
    return JSON.parse(localStorageValue);
  }

  return localStorageValue;
}

/* Remove a local storage value for the given
 * @param key - the key that we wish to remove
 */
async function removeLocalStorageItem(key) {
  await AsyncStorage.removeItem(key);
}

/* Sets a local storage value for the given
 * @param key - the key that we wish to set
 * @param{any} value - the value of the key we want to set in local storage
 */
async function setLocalStorageItem(key, value) {
  if (isObject(value) || isArray(value)) {
    return await AsyncStorage.setItem(key, JSON.stringify(value));
  } else {
    return await AsyncStorage.setItem(key, value);
  }
}

function isJsonString(stringValue) {
  try {
    JSON.parse(stringValue);
  } catch (e) {
    return false;
  }
  return true;
}

/**
 * Based on the given domain parameter will format and return the correct space domain format
 * @param{string} domainString - domain string
 * @returns string
 */
function formatSocketDomain({ domainString }) {
  let domainUrl = domainString;
  if (typeof domainUrl !== 'string') {
    return '';
  }

  if (!domainUrl) {
    return '';
  }
  // connection should end in '/socket'
  if (!domainUrl.includes(`/${SOCKET_URI}`)) {
    domainUrl = `${domainUrl}/${SOCKET_URI}`;
  }
  // check if the domain string contains socketProtocol and should add it or not
  // check secure vs un secure
  if (
    !domainUrl.includes(SOCKET_PROTOCOL_SECURE) &&
    !domainUrl.includes(SOCKET_PROTOCOL_UN_SECURE)
  ) {
    if (startsWith(domainUrl, 'localhost')) {
      domainUrl = `${SOCKET_PROTOCOL_UN_SECURE}${domainUrl}`;
    } else {
      domainUrl = `${SOCKET_PROTOCOL_SECURE}${domainUrl}`;
    }
  }

  return domainUrl;
}

export {
  isNullOrEmpty,
  isJsonString,
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
  formatSocketDomain,
  getUrlParameter,
};
