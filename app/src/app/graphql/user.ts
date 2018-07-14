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
      currentBuildId
      xp
      lvl
    }
  }
`;

export const UpdateUserMutation = gql`
  mutation UpdateUser(
    $id: ID!
    $currentBuildId: String
  ) {
    updateUser(
      id: $id
      currentBuildId: $currentBuildId
    ) {
      id
    }
  }
`;
