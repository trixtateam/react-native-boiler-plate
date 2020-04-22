/**
 *
 * SnackBarMessage
 *
 */

import React from 'react';
import { Snackbar } from 'react-native-paper';
import PropTypes from 'prop-types';
import styles from './SnackBarMessageStyle';
import { View } from 'react-native';

function SnackBarMessage({
  errorMessage,
  successMessage,
  duration,
  onDismiss,
  onPress,
  buttonLabel,
}) {
  return (
    <View style={styles.container}>
      <Snackbar
        visible={errorMessage !== false || successMessage !== false}
        style={errorMessage ? styles.error : styles.success}
        onDismiss={onDismiss}
        action={{
          label: buttonLabel,
          onPress: () => {
            onPress();
          },
        }}
        duration={duration}
      >
        {errorMessage || successMessage}
      </Snackbar>
    </View>
  );
}

SnackBarMessage.defaultProps = {
  duration: 7000,
  buttonLabel: 'Dismiss',
};

SnackBarMessage.propTypes = {
  duration: PropTypes.number,
  buttonLabel: PropTypes.string,
  onPress: PropTypes.func,
  onDismiss: PropTypes.func,
  errorMessage: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  successMessage: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default SnackBarMessage;
