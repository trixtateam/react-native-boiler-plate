import { changeUsername } from '../actions';
import { CHANGE_USERNAME } from '../constants';

describe('HomeScreen actions', () => {
  describe('changeUsername Action', () => {
    it('has a type of CHANGE_USERNAME', () => {
      const expected = {
        type: CHANGE_USERNAME,
        data: {
          username: 'jacques',
        },
      };
      expect(changeUsername({ username: 'jacques' })).toEqual(expected);
    });
  });
});
