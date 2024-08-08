import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (filter = null, keyword = null) => {
  let orderBy = null;
  let orderDirection = null;
  let searchKeyword = keyword;

  switch (filter) {
    case "latest":
      orderBy = "CREATED_AT";
      orderDirection = "DESC";
      break;
    case "highest":
      orderBy = "RATING_AVERAGE";
      orderDirection = "DESC";
      break;
    case "lowest":
      orderBy = "RATING_AVERAGE";
      orderDirection = "ASC";
      break;
  }

  const results = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: { orderBy, orderDirection, searchKeyword },
  });

  return {
    repositories: results.data ? results.data.repositories : null,
    loading: results.loading,
    refetch: results.refetch,
  };
};

export default useRepositories;
