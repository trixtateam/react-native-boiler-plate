import { createSelector } from 'reselect';

const selectPhoenix = (state) => state.phoenix;

const makeSelectSocket = () =>
  createSelector(
    selectPhoenix,
    (phoenixState) => phoenixState.socket,
  );

export { selectPhoenix, makeSelectSocket };
