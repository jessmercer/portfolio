import { createSelector } from 'reselect';

const getPredicate = createSelector(
  state => state?.contact,
  ({ isInitial, isPending, hasError }) => ({
    isInitial,
    isPending,
    hasError
  })
);

const getAcf = state => state?.contact?.data?.acf;
const getDescription = state => getAcf(state)?.description;
const getNumber = state => getAcf(state)?.number;
const getEmail = state => getAcf(state)?.email;

const getSimple = createSelector(
  [getDescription, getNumber, getEmail],
  (description, number, email) => ({
    description,
    number,
    email
  })
);

export default { getPredicate, getSimple };
