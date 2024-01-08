import { useApolloClient, useQuery } from '@apollo/client';
import useAuthStorage from './useAuthStorage';
import { ME } from '../graphql/queries';

const useAuthentication = (includeReviews = false) => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const { data, loading, refetch } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews }
  });

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return { me: data && data.me, loading, signOut, refetch };
};

export default useAuthentication;