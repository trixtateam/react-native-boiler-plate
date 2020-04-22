/*
 *
 * SnackBarMessageStyle
 *
 */
import { StyleSheet } from 'react-native';
import { Colors } from '../../../theme';

export default StyleSheet.create({
  error: {
    backgroundColor: Colors.error,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  success: {
    backgroundColor: Colors.success,
  },
});
