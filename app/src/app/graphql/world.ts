/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetWorldQuery = gql`
  query GetWorld($id: String) {
    world(id: $id) {
      id
      label
    }
  }
`;

export const GetWorldsQuery = gql`
  query GetWorlds($worldInput: WorldInput, $cursor: String, $sort: String) {
    worlds(worldInput: $worldInput, cursor: $cursor, sort: $sort) {
      total
      cursor
      nodes {
        id
        label
      }
    }
  }
`;

export const CreateWorldMutation = gql`
  mutation CreateWorld($label: String!) {
    createWorld(label: $label) {
      id
      label
    }
  }
`;

export const UpdateWorldMutation = gql`
  mutation UpdateWorld(
    $id: String!
    $label: String
  ) {
    updateWorld(
      id: $id
      label: $label
    ) {
      id
      label
    }
  }
`;

export const DeleteWorldMutation = gql`
  mutation DeleteWorld(
    $id: String!
  ) {
    deleteWorld(
      id: $id
    ) {
      id
    }
  }
`;
