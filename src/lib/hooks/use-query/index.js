import { useParams } from 'react-router-dom';
import { useQuery as useReactQuery } from 'react-query';

import { api } from '../../constants';

export const queryKeys = {
  project: 'project',
  projects: 'projects',
  home: 'home'
};

const useEndpoint = (queryKey) => {
  const { slug } = useParams();

  switch (queryKey) {
    case queryKeys.project:
      return `${api}/wp/v2/jess_project?_fields=title,acf,slug&slug=${slug}`;
    case queryKeys.projects:
      return `${api}/wp/v2/jess_project?_fields=title,acf,slug`;
    case queryKeys.home:
      return `${api}/wp/v2/pages?slug=jess-home&_fields=acf`;
  }
};

const useQuery = (queryKey, useQueryOptions) => {
  if (!queryKeys[queryKey]) {
    throw Error('The query key does not exist');
  }

  const endpoint = useEndpoint(queryKey);

  return useReactQuery(
    queryKey,
    () =>
      fetch(endpoint)
        .then((response) => response.json())
        .then((data) => data),
    {
      refetchOnWindowFocus: false,
      ...useQueryOptions
    }
  );
};

export default useQuery;
