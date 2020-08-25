/**
 *
 * LoginScreen
 *
 */

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { withTheme } from 'react-native-paper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styles from './LoginScreenStyle';
import { useInjectReducer } from '../../utils/injectReducer';
import { makeSelectIsLoggingIn, makeSelectSuccess } from './selectors';
import reducer from './reducer';
import { defaultAction, requestAuthentication } from './actions';
import SnackBarMessage from '../../components/common/SnackBarMessage';
import { makeSelectError } from '../App/selectors';

export function LoginScreen({
  dispatchRequestAuthentication,
  dispatchDefaultAction,
  isLoggingIn,
  error,
  success,
  navigation,
  theme,
}) {
  useInjectReducer({ key: 'loginScreen', reducer });
  const { control, handleSubmit, errors } = useForm();
  const { colors } = theme;
  return (
    <View style={styles.container}>
      <SnackBarMessage
        errorMessage={error}
        successMessage={success}
        onPress={dispatchDefaultAction}
        onDismiss={dispatchDefaultAction}
      />
      <Controller
        as={Input}
        control={control}
        placeholder="Email Address"
        name="identity"
        // eslint-disable-next-line react-native/no-inline-styles
        containerStyle={{ marginBottom: 20 }}
        errorStyle={{ color: colors.error }}
        errorMessage={errors.identity && 'Enter email address'}
        leftIcon={
          // eslint-disable-next-line react-native/no-inline-styles
          <Icon name="envelope" size={24} color={colors.accent} style={{ marginRight: 20 }} />
        }
        onChange={(args) => args[0].nativeEvent.text}
        rules={{ required: true }}
        defaultValue=""
      />
      <Controller
        as={Input}
        control={control}
        placeholder="Password"
        name="password"
        // eslint-disable-next-line react-native/no-inline-styles
        containerStyle={{ marginBottom: 20 }}
        errorStyle={{ color: colors.error }}
        secureTextEntry
        errorMessage={errors.password && 'Enter password'}
        // eslint-disable-next-line react-native/no-inline-styles
        leftIcon={<Icon name="lock" size={24} color={colors.accent} style={{ marginRight: 10 }} />}
        onChange={(args) => args[0].nativeEvent.text}
        rules={{ required: true }}
        defaultValue=""
      />
      <Button
        disabled={isLoggingIn}
        color={colors.primary}
        title={!isLoggingIn ? 'Submit' : 'Submitting'}
        onPress={handleSubmit(dispatchRequestAuthentication)}
      />
    </View>
  );
}

LoginScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.object,
  dispatchRequestAuthentication: PropTypes.func,
  dispatchDefaultAction: PropTypes.func,
  isLoggingIn: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  success: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const mapStateToProps = (state, props) =>
  createStructuredSelector({
    isLoggingIn: makeSelectIsLoggingIn(state, props),
    error: makeSelectError(state, props),
    success: makeSelectSuccess(state, props),
  });

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    dispatchRequestAuthentication: ({ domain, identity, password }) => {
      dispatch(requestAuthentication({ data: { domain, identity, password } }));
    },
    dispatchDefaultAction: () => {
      dispatch(defaultAction());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withTheme,
)(LoginScreen);
