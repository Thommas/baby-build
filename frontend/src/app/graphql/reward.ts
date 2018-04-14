/**
 * Path of child
 *
 * GraphQL - Quest
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetRewards = gql`
  query GetRewards($build_id: String!, $child_year: Int!) {
    rewards(build_id: $build_id, child_year: $child_year) {
      id
      title
      description
    }
  }
`;

export const GetReward = gql`
  query GetReward($id: String!) {
    reward(id: $id) {
      id
      title
      description
    }
  }
`;

export const CreateRewardMutation = gql`
  mutation CreateReward(
    $title: String!
    $description: String!
    $build_id: String!
    $child_year: Int!
  ) {
    createReward(
      title: $title
      description: $description
      build_id: $build_id
      child_year: $child_year
    ) {
      id
    }
  }
`;

export const UpdateRewardMutation = gql`
  mutation UpdateReward(
    $id: ID!
    $title: String!
    $description: String!
  ) {
    updateReward(
      id: $id
      title: $title
      description: $description
    ) {
      id
    }
  }
`;
