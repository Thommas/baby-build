/**
 * Path of child
 *
 * GraphQL - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetBuilds = gql`
  query GetBuilds($user_id: String!) {
    builds(user_id: $user_id) {
      id
      name
      description
      xp
      lvl
    }
  }
`;

export const GetBuild = gql`
  query GetBuild($id: ID!) {
    build(id: $id) {
      id
      name
      description
      xp
      lvl
    }
  }
`;

export const CreateBuildMutation = gql`
  mutation CreateBuild(
    $name: String!
    $description: String!
  ) {
    createBuild(
      name: $name
      description: $description
    ) {
      id
    }
  }
`;

export const UpdateBuildMutation = gql`
  mutation UpdateBuild(
    $id: ID!
    $name: String!
    $description: String!
  ) {
    updateBuild(
      id: $id
      name: $name
      description: $description
    ) {
      id
    }
  }
`;
