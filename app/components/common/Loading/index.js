/**
 *
 * Loading
 *
 */

import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import styles from './LoadingStyle';
import PropTypes from 'prop-types';

function Loading({ loading, size }) {
  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size={size} animating={true} />
      </View>
    );
  }
  return null;
}

Loading.defaultProps = {
  size: 'large',
};
Loading.propTypes = {
  size: PropTypes.string,
  loading: PropTypes.bool,
};

export default Loading;
