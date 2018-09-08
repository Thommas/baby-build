/**
 * Path of child
 *
 * GraphQL - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetBuilds = gql`
  query GetBuilds {
    builds {
      id
      label
      description
    }
  }
`;

export const GetBuild = gql`
  query GetBuild($id: ID!) {
    build(id: $id) {
      id
      label
      description
    }
  }
`;

export const CreateBuildMutation = gql`
  mutation CreateBuild(
    $label: String!
    $description: String!
  ) {
    createBuild(
      label: $label
      description: $description
    ) {
      id
    }
  }
`;

export const UpdateBuildMutation = gql`
  mutation UpdateBuild(
    $id: ID!
    $label: String!
    $description: String!
  ) {
    updateBuild(
      id: $id
      label: $label
      description: $description
    ) {
      id
    }
  }
`;
