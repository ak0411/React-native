import { useQuery } from '@apollo/client';
import { GET_REPOSITORY_BY_ID } from '../graphql/queries';

const useRepositoryById = (id) => {
  const { data, loading } = useQuery(GET_REPOSITORY_BY_ID, {
    fetchPolicy: 'cache-and-network',
    variables: { repositoryId: id },
    skip: !id,
  });

  if (loading) return null;

  return data.repository;
};

export default useRepositoryById;