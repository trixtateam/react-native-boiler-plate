import { isNull, isUndefined, isEmpty, isArray, isObject } from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';

/**
 * Returns true if the value is null or undefined or empty
 * @param value
 * @returns {boolean}
 */
export function isNullOrEmpty(value) {
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
export async function getLocalStorageItem(key, defaultValue = null) {
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
export async function removeLocalStorageItem(key) {
  await AsyncStorage.removeItem(key);
}

/* Sets a local storage value for the given
 * @param key - the key that we wish to set
 * @param{any} value - the value of the key we want to set in local storage
 */
export async function setLocalStorageItem(key, value) {
  if (isObject(value) || isArray(value)) {
    return await AsyncStorage.setItem(key, JSON.stringify(value));
  } else {
    return await AsyncStorage.setItem(key, value);
  }
}

export function isJsonString(stringValue) {
  try {
    JSON.parse(stringValue);
  } catch (e) {
    return false;
  }
  return true;
}
