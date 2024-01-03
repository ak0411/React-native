import { useApolloClient, useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const credentials = { username, password };
    const result = await mutate({ variables: { credentials } });
    const token = result.data.authenticate.accessToken;

    await authStorage.setAccessToken(token);
    apolloClient.resetStore();

    return result;
  };

  return [signIn, result];
};

export default useSignIn;