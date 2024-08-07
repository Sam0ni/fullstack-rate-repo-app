import { CREATE_REVIEW } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const reviewSend = async ({ ownerName, repositoryName, rating, text }) => {
    const res = await mutate({
      variables: { ownerName, rating, repositoryName, text },
    });
    return res;
  };

  return [reviewSend, result];
};

export default useReview;
