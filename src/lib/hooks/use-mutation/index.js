import { useMutation as useReactQueryMutation } from 'react-query';
import axios from 'axios';

import { api } from '../../constants';

export const authApi = {
  endpoint: `${api}/jwt-auth/v1/token`
};

const acceptedMethods = ['post', 'put', 'patch'];

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

  if (!acceptedMethods.includes(method.toLowerCase())) {
    throw Error(`${method} is not an accepted method`);
  }

  if (!queryKey) {
    throw Error('The query key does not exist');
  }

  return useReactQueryMutation((body) => {
    const formData = new FormData();
    formData.append('username', process.env.REACT_APP_AUTH_USERNAME);
    formData.append('password', process.env.REACT_APP_AUTH_PASSWORD);

    return axios
      .post(authApi.endpoint, formData)
      .then(({ data: { data: { token } = {} } = {} } = {}) =>
        axios[method](endpoint, JSON.stringify(body), {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            accept: 'application/json'
          }
        }).then(({ data }) => data)
      );
  }, useMutationOptions);
};

export default useMutation;
