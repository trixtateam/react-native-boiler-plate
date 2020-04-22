/**
 *
 * DrawerSettingsItem
 *
 */

import React from 'react';
import { View } from 'react-native';
import { Subheading, Switch } from 'react-native-paper';
import styles from './DrawerSettingsItemStyle';
import PropTypes from 'prop-types';

function DrawerSettingsItem({ label, value, onValueChange }) {
  return (
    <View style={styles.container}>
      <Subheading>{label}</Subheading>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}

DrawerSettingsItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool,
  onValueChange: PropTypes.func,
};

export default DrawerSettingsItem;
