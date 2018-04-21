/**
 * Path of child
 *
 * GraphQL - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetBuilds = gql`
  query GetBuilds($child_id: String!) {
    builds(child_id: $child_id) {
      id
      title
      description
      goal_count
      gamification {
        xp
        lvl
      }
    }
  }
`;

export const GetBuild = gql`
  query GetBuild($id: ID!) {
    build(id: $id) {
      id
      title
      description
      goal_count
      gamification {
        xp
        lvl
      }
    }
  }
`;

export const CreateBuildMutation = gql`
  mutation CreateBuild(
    $title: String!
    $description: String!
    $child_id: String!
  ) {
    createBuild(
      title: $title
      description: $description
      child_id: $child_id
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
