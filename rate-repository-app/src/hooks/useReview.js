import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    const review = { ownerName, repositoryName, rating: Number(rating), text };
    return await mutate({ variables: { review } });
  };

  return [createReview, result];
};

export default useReview;