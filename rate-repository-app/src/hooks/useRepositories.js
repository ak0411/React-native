import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });

  return { repositories: data && data.repositories, loading, refetch: fetchMore };
};

export default useRepositories;