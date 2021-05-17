/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetAuthUser = gql`
  query GetAuthUser {
    authUser {
      id
      firstName
      lastName
      xp
      lvl
      nextLvlXp
    }
  }
`;

export const GetUsers = gql`
  query GetUsers($searchQuery: String!) {
    users(searchQuery: $searchQuery) {
      id
      firstName
      lastName
      xp
      lvl
      nextLvlXp
    }
  }
`;

export const UpdateUserMutation = gql`
  mutation UpdateUser(
    $id: String!
    $firstName: String
    $lastName: String
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
    ) {
      id
    }
  }
`;
