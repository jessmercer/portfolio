import { useQuery as useReactQuery } from 'react-query';

import { api } from '../../constants';

export const services = {
  home: {
    queryKey: 'home',
    endpoint: `${api}/wp/v2/pages`,
    params: {
      slug: 'jess-home',
      _fields: 'acf'
    }
  },
  projects: {
    queryKey: 'projects',
    endpoint: `${api}/wp/v2/jess_project`,
    params: {
      _fields: 'title,acf,slug'
    }
  },
  project: {
    queryKey: 'project',
    endpoint: `${api}/wp/v2/jess_project`,
    params: {
      _fields: 'title,acf,slug'
    }
  }
};

const useQuery = (service, { useQueryOptions, options = {} } = {}) => {
  const { queryKey, endpoint, params } = service;

  if (!queryKey) {
    throw Error('The query key does not exist');
  }

  return useReactQuery(
    queryKey,
    () =>
      fetch(
        params
          ? `${endpoint}?` +
              new URLSearchParams({ ...params, ...options.params })
          : endpoint
      )
        .then((response) => response.json())
        .then((data) => data),
    {
      refetchOnWindowFocus: false,
      ...useQueryOptions
    }
  );
};

export default useQuery;
