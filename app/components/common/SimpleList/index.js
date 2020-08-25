/**
 *
 * SimpleList
 *
 */

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './SimpleListStyle';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';
import ApplicationStyles from '../../../theme/ApplicationStyles';

function SimpleList({ items, error }) {
  if (error !== false) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      {items &&
        items.map((item, index) => (
          <ListItem
            key={item.key}
            title={item.title}
            subtitle={item.subTitle}
            leftAvatar={{ source: { uri: item.avatarUrl } }}
            subtitleStyle={ApplicationStyles.subTitle}
            bottomDivider
          />
        ))}
    </ScrollView>
  );
}

SimpleList.propTypes = {
  error: PropTypes.any,
  items: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        title: PropTypes.string,
        subTitle: PropTypes.string,
        avatarUrl: PropTypes.string,
      }),
    ),
    PropTypes.bool,
  ]),
};

export default SimpleList;
