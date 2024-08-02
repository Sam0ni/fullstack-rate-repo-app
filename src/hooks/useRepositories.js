import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const results = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  return {
    repositories: results.data ? results.data.repositories : null,
    loading: results.loading,
    refetch: results.refetch,
  };
};

export default useRepositories;
