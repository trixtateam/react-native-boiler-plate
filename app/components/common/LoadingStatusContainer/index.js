/**
 *
 * Loading
 *
 */

import React from 'react';
import { get } from 'lodash';
import { ActivityIndicator, View } from 'react-native';
import { Colors } from '../../../theme';
import styles from './LoadingStyle';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { makeSelectLoadingStatusForKey } from '../../../containers/App/selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';

function LoadingStatusContainer({ loadingStatus, size, children }) {
  const isLoading = get(loadingStatus, 'status', false);
  if (isLoading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size={size} color={Colors.primary} />
      </View>
    );
  }
  return children || null;
}

LoadingStatusContainer.defaultProps = {
  size: 'large',
};
LoadingStatusContainer.propTypes = {
  size: PropTypes.string,
  loadingStatus: PropTypes.object,
  loadingStatusKey: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) =>
  createStructuredSelector({
    loadingStatus: makeSelectLoadingStatusForKey(state, props),
  });

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(LoadingStatusContainer);
