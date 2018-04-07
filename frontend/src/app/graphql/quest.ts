/**
 * Path of child
 *
 * GraphQL - Quest
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetQuests = gql`
  query GetQuests($build_id: String!, $child_year: Int!) {
    goals(build_id: $build_id, child_year: $child_year) {
      id
      title
      description
    }
  }
`;

export const GetQuest = gql`
  query GetQuest($id: String!) {
    goal(id: $id) {
      id
      title
      description
    }
  }
`;

export const CreateQuestMutation = gql`
  mutation CreateQuest(
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

export const UpdateQuestMutation = gql`
  mutation UpdateQuest(
    $id: ID!
    $title: String!
    $description: String!
  ) {
    updateQuest(
      id: $id
      title: $title
      description: $description
    ) {
      id
    }
  }
`;
