import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (repositoryId) => {
  const results = useQuery(GET_REPOSITORY, {
    variables: { id: repositoryId },
    fetchPolicy: "cache-and-network",
  });

  return {
    repository: results.data ? results.data.repository : null,
    loading: results.loading,
    refetch: results.refetch,
  };
};

export default useRepository;
