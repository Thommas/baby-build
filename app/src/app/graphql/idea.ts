/**
 * Path of child
 *
 * GraphQL - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetIdeas = gql`
  query GetIdeas {
    ideas {
      id
      label
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
    }
  }
`;

export const DeleteIdeaMutation = gql`
  mutation DeleteIdea(
    $id: ID!
  ) {
    deleteIdea(
      id: $id
    ) {
      id
    }
  }
`;
