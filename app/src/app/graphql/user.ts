/**
 * Path of child
 *
 * GraphQL - User
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

export const UpdateUserMutation = gql`
  mutation UpdateUser(
    $id: ID!
  ) {
    updateUser(
      id: $id
    ) {
      id
    }
  }
`;
