import { createSelector } from 'reselect';

const getPredicate = createSelector(
  (state) => state?.contact,
  ({
    isInitial = false,
    isPending = false,
    hasError = false,
    isSuccess = false
  } = {}) => ({
    isInitial,
    isPending,
    hasError,
    isSuccess
  })
);

export default { getPredicate };
