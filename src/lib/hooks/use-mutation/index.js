import { useMutation as useReactQueryMutation } from 'react-query';

import { api } from '../../constants';

const authApi = `${api}/jwt-auth/v1/token`;
const acceptedMethods = ['POST', 'PUT', 'PATCH'];

export const mutationKeys = {
  contact: 'contact'
};

const useEndpoint = (mutationKey) => {
  switch (mutationKey) {
    case mutationKeys.contact:
      return `${api}/wp/v2/jess_message`;
  }
};

const useMutation = (
  mutationKey,
  { method = 'POST' } = {},
  useMutationOptions
) => {
  if (!acceptedMethods.includes(method)) {
    throw Error(`${method} is not an accepted method`);
  }

  if (!mutationKeys[mutationKey]) {
    throw Error('The query key does not exist');
  }

  const endpoint = useEndpoint(mutationKey);

  return useReactQueryMutation((body) => {
    const formData = new FormData();
    formData.append('username', 'Auth');
    formData.append('password', 'MUe4@(Em3SGJ2$5ucnMIJsc5');

    return fetch(authApi, {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then(({ data: { token } = {} } = {}) =>
        fetch(endpoint, {
          method,
          body: JSON.stringify(body),
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            accept: 'application/json'
          }
        }).then((data) => data)
      );
  }, useMutationOptions);
};

export default useMutation;
