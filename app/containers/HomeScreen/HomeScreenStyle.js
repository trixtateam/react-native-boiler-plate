/*
 *
 * HomeScreenStyle
 *
 */
import { StyleSheet } from 'react-native';
import { Colors } from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.transparent,
    flex: 1,
  },
  usernameContainer: {
    marginTop: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
