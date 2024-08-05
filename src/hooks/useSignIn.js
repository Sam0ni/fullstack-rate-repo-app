import { useApolloClient, useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    const res = await mutate({ variables: { username, password } });
    await authStorage.setAccessToken(res.data.authenticate.accessToken);
    apolloClient.resetStore();
    return res;
  };

  return [signIn, result];
};

export default useSignIn;
