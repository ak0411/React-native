import { useMutation } from '@apollo/client';
import { CREATE_REVIEW, DELETE_REVIEW } from '../graphql/mutations';

const useReview = () => {
  const [createMutate, createResult] = useMutation(CREATE_REVIEW);
  const [deleteMutate, deleteResult] = useMutation(DELETE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    const review = { ownerName, repositoryName, rating: Number(rating), text };
    return await createMutate({ variables: { review } });
  };

  const deleteReview = async (deleteReviewId) => {
    return await deleteMutate({ variables: { deleteReviewId } });
  };

  return [createReview, createResult, deleteReview, deleteResult];
};

export default useReview;
