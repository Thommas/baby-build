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
      child {
        nickname
      }
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

export const GetBuild = gql`
  query GetBuild($id: ID!) {
    build(id: $id) {
      id
      title
      description
      quests {
        id
        title
      }
      gamification {
        xp
        lvl
      }
    }
  }
`;
