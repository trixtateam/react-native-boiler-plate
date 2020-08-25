/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'appName/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'appName/YourContainer/YOUR_ACTION_CONSTANT';
 */
import { name } from '../../../app.json';

export const LOAD_REPOS = `${name}/App/LOAD_REPOS`;
export const LOAD_REPOS_SUCCESS = `${name}/App/LOAD_REPOS_SUCCESS`;
export const LOAD_REPOS_ERROR = `${name}/App/LOAD_REPOS_ERROR`;
export const RESET_ERROR = `${name}/App/RESET_ERROR`;
export const UPDATE_ERROR = `${name}/App/UPDATE_ERROR`;
export const UPDATE_LOADING_STATUS = `${name}/App/UPDATE_LOADING_STATUS`;
export const LOADING = `${name}/App/LOADING`;
export const END_PROGRESS = `${name}/App/END_PROGRESS`;

export const SET_AUTHENTICATION_TOKEN = `${name}/App/SET_AUTHENTICATION_TOKEN`;
export const CHECK_FOR_AUTHENTICATION_TOKEN = `${name}/App/CHECK_FOR_AUTHENTICATION_TOKEN`;
export const UPDATE_CURRENT_USER = `${name}/App/UPDATE_CURRENT_USER`;
export const SIGN_OUT = `${name}/App/SIGN_OUT`;

export const THEME_PERSISTENCE_KEY = `${name}/App/THEME_TYPE`;
export const PERSISTENCE_KEY = `${name}/App/NAVIGATION_STATE`;
export const PHOENIX_TOKEN = `${name}/App/PHOENIX_TOKEN`;
export const PHOENIX_AGENT = `${name}/App/PHOENIX_AGENT`;
export const PHOENIX_DOMAIN = `${name}/App/PHOENIX_DOMAIN`;
