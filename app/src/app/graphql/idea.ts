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
      requiredAge
      requiredAgeExplanation
      score
      scoreExplanation
    }
  }
`;

export const CreateIdeaMutation = gql`
  mutation CreateIdea {
    createIdea {
      id
    }
  }
`;

export const UpdateIdeaMutation = gql`
  mutation UpdateIdea(
    $id: ID!
    $label: String
    $requiredAge: Int
    $requiredAgeExplanation: String
    $score: Int
    $scoreExplanation: String
  ) {
    updateIdea(
      id: $id
      label: $label
      requiredAge: $requiredAge
      requiredAgeExplanation: $requiredAgeExplanation
      score: $score
      scoreExplanation: $scoreExplanation
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
