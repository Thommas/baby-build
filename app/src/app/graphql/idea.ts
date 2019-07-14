/**
 * Path of child
 *
 * GraphQL - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetIdeas = gql`
  query GetIdeas($label: String, $requiredAge: [Int], $score: [Int], $tagId: String) {
    ideas(label: $label, requiredAge: $requiredAge, score: $score, tagId: $tagId) {
      id
      label
      icon
      requiredAge
      score
      userId
      user {
        firstName
        lastName
      }
    }
  }
`;

export const CreateIdeaMutation = gql`
  mutation CreateIdea {
    createIdea {
      id
      label
      icon
      requiredAge
      score
      userId
      user {
        firstName
        lastName
      }
    }
  }
`;

export const UpdateIdeaMutation = gql`
  mutation UpdateIdea(
    $id: String!
    $label: String
    $requiredAge: Float
    $score: Float
  ) {
    updateIdea(
      id: $id
      label: $label
      requiredAge: $requiredAge
      score: $score
    ) {
      id
      label
      icon
      requiredAge
      score
      userId
      user {
        firstName
        lastName
      }
    }
  }
`;

export const UpdateIdeaIconMutation = gql`
  mutation UpdateIdeaIcon(
    $id: String!
  ) {
    updateIdeaIcon(
      id: $id
    ) {
      id
      label
      icon
      requiredAge
      score
      userId
      user {
        firstName
        lastName
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
