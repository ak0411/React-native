import { useApolloClient, useQuery } from '@apollo/client';
import useAuthStorage from './useAuthStorage';
import { ME } from '../graphql/queries';

const useAuthentication = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const { data } = useQuery(ME, {
    fetchPolicy: 'cache-and-network'
  });

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return { isAuthenticated: data && data.me, signOut };
};

export default useAuthentication;