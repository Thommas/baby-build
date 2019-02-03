/**
 * Path of child
 *
 * GraphQL - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetIdeas = gql`
  query GetIdeas($requiredAge: [Int]) {
    ideas(requiredAge: $requiredAge) {
      id
      label
      icon
      userId
      loggedIdeaUser {
        id
        requiredAge
        requiredAgeExplanation
        score
        scoreExplanation
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
      userId
      loggedIdeaUser {
        id
      }
    }
  }
`;

export const UpdateIdeaMutation = gql`
  mutation UpdateIdea(
    $id: String!
    $label: String
  ) {
    updateIdea(
      id: $id
      label: $label
    ) {
      id
      label
      icon
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
