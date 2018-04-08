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
    quests(build_id: $build_id, child_year: $child_year) {
      id
      quest_type
      title
      description
      option1
      option2
      option3
    }
  }
`;

export const GetQuest = gql`
  query GetQuest($id: String!) {
    quest(id: $id) {
      id
      quest_type
      title
      description
      option1
      option2
      option3
    }
  }
`;

export const CreateQuestMutation = gql`
  mutation CreateQuest(
    $build_id: String!
    $child_year: Int!
    $quest_type: String!
    $title: String!
    $description: String!
    $option1: String
    $option2: String
    $option3: String
  ) {
    createQuest(
      build_id: $build_id
      child_year: $child_year
      quest_type: $quest_type
      title: $title
      description: $description
      option1: $option1
      option2: $option2
      option3: $option3
    ) {
      id
    }
  }
`;

export const UpdateQuestMutation = gql`
  mutation UpdateQuest(
    $id: ID!
    $quest_type: String!
    $title: String!
    $description: String!
    $option1: String
    $option2: String
    $option3: String
  ) {
    updateQuest(
      id: $id
      quest_type: $quest_type
      title: $title
      description: $description
      option1: $option1
      option2: $option2
      option3: $option3
    ) {
      id
    }
  }
`;
