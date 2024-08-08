import { SIGN_UP } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP);

  const signUpSend = async ({ username, password }) => {
    const res = await mutate({
      variables: { username, password },
    });
    return res;
  };

  return [signUpSend, result];
};

export default useSignUp;
