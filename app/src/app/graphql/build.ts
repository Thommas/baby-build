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
      title
      description
    }
  }
`;

export const GetBuild = gql`
  query GetBuild($id: ID!) {
    build(id: $id) {
      id
      title
      description
    }
  }
`;

export const CreateBuildMutation = gql`
  mutation CreateBuild(
    $title: String!
    $description: String!
  ) {
    createBuild(
      title: $title
      description: $description
    ) {
      id
    }
  }
`;

export const UpdateBuildMutation = gql`
  mutation UpdateBuild(
    $id: ID!
    $title: String!
    $description: String!
  ) {
    updateBuild(
      id: $id
      title: $title
      description: $description
    ) {
      id
    }
  }
`;
