/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import Colors from './Colors';
import Fonts from './Fonts';

export default {
  button: {
    backgroundColor: Colors.primary,
  },
  subTitle: {
    ...Fonts.subTitle,
    color: Colors.grey,
  },
};
