import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
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

export const GET_REPOSITORY = gql`
  query findRepository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      forksCount
      description
      language
      ownerAvatarUrl
      reviewCount
      ratingAverage
      stargazersCount
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const GET_ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

// other queries...
