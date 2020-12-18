import { createSelector } from 'reselect';

const getPredicate = createSelector(
  state => state?.home,
  ({ isInitial = false, isPending = false, hasError = false } = {}) => ({
    isInitial,
    isPending,
    hasError
  })
);

const getAcf = state => state?.home?.data?.acf;
const getDescription = state => getAcf(state)?.description;
const getHeading = state => getAcf(state)?.heading;

const getSimple = createSelector(
  [getDescription, getHeading],
  (description, heading) => ({
    description,
    heading
  })
);

export default { getPredicate, getSimple };
