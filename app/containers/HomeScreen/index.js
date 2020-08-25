/**
 *
 * HomeScreen
 *
 */

import React from 'react';
import { View } from 'react-native';
import { Input, Button, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styles from './HomeScreenStyle';
import { makeSelectError, makeSelectLoadingStatus } from '../App/selectors';
import { makeSelectRepositoriesForListFormat, makeSelectUsername } from './selectors';
import { changeUsername } from './actions';
import { loadRepos } from '../App/actions';
import reducer from './reducer';
import SimpleList from '../../components/common/SimpleList';
import { useInjectReducer } from '../../utils/injectReducer';
import { Colors } from '../../theme';
import LoadingStatusContainer from '../../components/common/LoadingStatusContainer';
import { LOADING_STATUS } from './constants';

export function HomeScreen({
  username,
  error,
  repositories,
  dispatchLoadRepos,
  navigation,
  dispatchChangeUsername,
}) {
  useInjectReducer({ key: 'homeScreen', reducer });
  return (
    <View style={styles.container}>
      <Header
        centerComponent={{
          text: 'SEARCH GITHUB REPOSITORIES',
          style: { color: Colors.white },
        }}
      />
      <View style={styles.usernameContainer}>
        <View>
          <Input
            autoCompleteType="username"
            leftIcon={<Icon name="at" size={24} color={Colors.grey} />}
            autoFocus
            placeholder="username"
            // eslint-disable-next-line react-native/no-inline-styles
            containerStyle={{ width: 250 }}
            value={username}
            onChange={dispatchChangeUsername}
          />
        </View>
        <View>
          <Button title="Search" containerStyle={{}} onPress={() => dispatchLoadRepos()} />
        </View>
      </View>
      <LoadingStatusContainer loadingStatusKey={LOADING_STATUS.reposLoading}>
        <SimpleList error={error} items={repositories} />
      </LoadingStatusContainer>
    </View>
  );
}

HomeScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.object,
  loadingStatus: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  repositories: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  dispatchLoadRepos: PropTypes.func,
  username: PropTypes.string,
  dispatchChangeUsername: PropTypes.func,
};

const mapStateToProps = (state, props) =>
  createStructuredSelector({
    loadingStatus: makeSelectLoadingStatus(state, props),
    error: makeSelectError(state, props),
    username: makeSelectUsername(state, props),
    repositories: makeSelectRepositoriesForListFormat(state, props),
  });

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    dispatchChangeUsername: (evt) => dispatch(changeUsername({ username: evt.nativeEvent.text })),
    dispatchLoadRepos: (evt) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomeScreen);
