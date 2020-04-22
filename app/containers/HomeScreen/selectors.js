import { createSelector } from 'reselect';
import { initialState } from './reducer';
import _ from 'lodash';
import { selectRepositories } from '../App/selectors';

/**
 * Direct selector to the homeScreen state domain
 */

const selectHomeScreenDomain = (state) => state.homeScreen || initialState;

/**
 * Other specific selectors
 */
const makeSelectUsername = () =>
  createSelector(
    selectHomeScreenDomain,
    (homeState) => homeState.username,
  );

const makeSelectRepositoriesForListFormat = () =>
  createSelector(
    selectRepositories,
    (repositories) => {
      return repositories && _.isArray(repositories)
        ? repositories.map((repo) => {
            return {
              key: repo.name,
              title: repo.name,
              subTitle: repo.description,
              avatarUrl: repo.owner.avatar_url,
            };
          })
        : [];
    },
  );
/**
 * Default selector used by HomeScreen
 */

const makeSelectHomeScreen = (state, props) =>
  createSelector(
    selectHomeScreenDomain,
    (substate) => substate,
  );

export default makeSelectHomeScreen;
export { selectHomeScreenDomain, makeSelectUsername, makeSelectRepositoriesForListFormat };
