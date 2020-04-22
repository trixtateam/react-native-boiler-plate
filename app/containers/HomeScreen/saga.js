import { takeLatest, call, put, select } from 'redux-saga/effects';
import { makeSelectUsername } from './selectors';
import { LOAD_REPOS } from '../App/constants';
import { endProgress, repoLoadingError, reposLoaded, updateLoadingStatus } from '../App/actions';
import request from '../../utils/request';
import { LOADING_STATUS } from './constants';

/**
 * Github repos request/response handler
 */
export function* getReposSaga() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  yield put(updateLoadingStatus({ loadingStatusKey: LOADING_STATUS.reposLoading }));
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(reposLoaded({ repos, username }));
    yield put(endProgress({ loadingStatusKey: LOADING_STATUS.reposLoading }));
  } catch (err) {
    console.log(err);
    yield put(endProgress({ loadingStatusKey: LOADING_STATUS.reposLoading }));
    yield put(repoLoadingError(err));
  }
}

// Individual exports for testing
export default function* homeScreenSaga() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_REPOS, getReposSaga);
}
