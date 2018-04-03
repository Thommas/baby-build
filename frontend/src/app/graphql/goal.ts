/**
 * Path of child
 *
 * GraphQL - Quest
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetGoals = gql`
  query GetGoals($build_id: String!, $child_year: Int!) {
    goals(build_id: $build_id, child_year: $child_year) {
      id
      title
      description
    }
  }
`;

export const CreateGoalMutation = gql`
  mutation CreateGoal(
    $title: String!
    $description: String!
    $build_id: String!
    $child_year: Int!
  ) {
    createQuest(
      title: $title
      description: $description
      build_id: $build_id
      child_year: $child_year
    ) {
      id
    }
  }
`;

export const UpdateGoalMutation = gql`
  mutation UpdateGoal(
    $id: ID!
    $title: String!
    $description: String!
  ) {
    updateWhitelistItem(
      id: $id
      title: $title
      description: $description
    ) {
      id
    }
  }
`;
