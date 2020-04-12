/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetIdeas = gql`
  query GetIdeas($ideaInput: IdeaInput, $cursor: String) {
    ideas(ideaInput: $ideaInput, cursor: $cursor) {
      total
      cursor
      nodes {
        id
        label
        category
        requiredAge
        score
        userId
        user {
          firstName
          lastName
        }
        imgs {
          icon
          cover
          screenshot
        }
      }
    }
  }
`;

export const CreateIdeaMutation = gql`
  mutation CreateIdea($label: String!, $category: String!, $platform: String) {
    createIdea(label: $label, category: $category, platform: $platform) {
      id
      label
      category
      platform
      requiredAge
      score
      userId
      user {
        firstName
        lastName
      }
      imgs {
        icon
        cover
        screenshot
      }
    }
  }
`;

export const UpdateIdeaMutation = gql`
  mutation UpdateIdea(
    $id: String!
    $label: String
    $category: String
    $platform: String
    $requiredAge: Float
    $score: Float
  ) {
    updateIdea(
      id: $id
      label: $label
      category: $category
      platform: $platform
      requiredAge: $requiredAge
      score: $score
    ) {
      id
      label
      category
      platform
      requiredAge
      score
      userId
      user {
        firstName
        lastName
      }
      imgs {
        icon
        cover
        screenshot
      }
    }
  }
`;

export const DeleteIdeaMutation = gql`
  mutation DeleteIdea(
    $id: String!
  ) {
    deleteIdea(
      id: $id
    ) {
      id
    }
  }
`;
