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
    }
  }
`;

export const CreateBuildMutation = gql`
  mutation CreateBuild(
    $name: String!
  ) {
    createChild(
      name: $name
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
    }
  }
`;
