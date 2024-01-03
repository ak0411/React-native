import { useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const credentials = { username, password };
    const data = await mutate({ variables: { credentials } });

    return data;
  };

  return [signIn, result];
};

export default useSignIn;