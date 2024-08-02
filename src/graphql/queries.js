import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          fullName
          forksCount
          description
          language
          ownerAvatarUrl
          reviewCount
          ratingAverage
          stargazersCount
        }
      }
    }
  }
`;

// other queries...
