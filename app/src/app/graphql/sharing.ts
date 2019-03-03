/**
 * Path of child
 *
 * GraphQL - Sharing
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetSharings = gql`
  query GetSharings {
    sharings {
      id
      userId
      sharerId
      user {
        firstName
        lastName
      }
    }
  }
`;

export const CreateSharingMutation = gql`
  mutation CreateSharing(
    $userId: String!
  ) {
    createSharing(
      userId: $userId
    ) {
      id
    }
  }
`;

export const DeleteSharingMutation = gql`
  mutation DeleteSharing(
    $id: String!
  ) {
    deleteSharing(
      id: $id
    ) {
      id
    }
  }
`;
