/**
 * Path of child
 *
 * GraphQL - Quest
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetQuests = gql`
  query GetQuests($build_id: String!, $year: Int!) {
    quests(build_id: $build_id, year: $year) {
      id
      title
      description
    }
  }
`;

export const CreateQuestMutation = gql`
  mutation CreateQuest(
    $title: String!
    $build_id: String!
  ) {
    createQuest(
      title: $title
      build_id: $build_id
    ) {
      id
    }
  }
`;
