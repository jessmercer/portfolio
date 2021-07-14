import { useMutation as useReactQueryMutation } from 'react-query';

import { api } from '../../constants';

export const authApi = {
  endpoint: `${api}/jwt-auth/v1/token`
};

const acceptedMethods = ['POST', 'PUT', 'PATCH'];

export const services = {
  contact: {
    queryKey: 'contact',
    endpoint: `${api}/wp/v2/jess_message`
  }
};

const useMutation = (
  service = {},
  { method = 'post', useMutationOptions } = {}
) => {
  const { queryKey, endpoint } = service;

  const methodUppercase = method.toUpperCase();

  if (!acceptedMethods.includes(methodUppercase)) {
    throw Error(`${methodUppercase} is not an accepted method`);
  }

  if (!queryKey) {
    throw Error('The query key does not exist');
  }

  return useReactQueryMutation((body) => {
    const formData = new FormData();
    formData.append('username', 'Auth');
    formData.append('password', 'MUe4@(Em3SGJ2$5ucnMIJsc5');

    return fetch(authApi.endpoint, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .then(({ data: { token } = {} } = {}) =>
        fetch(endpoint, {
          method: methodUppercase,
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
