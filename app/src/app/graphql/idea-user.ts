/**
 * Path of child
 *
 * GraphQL - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetIdeaUser = gql`
  query GetIdeaUser {
    ideaUser {
      id
      requiredAge
      requiredAgeExplanation
      score
      scoreExplanation
      ideaId
      userId
    }
  }
`;

export const CreateIdeaUserMutation = gql`
  mutation CreateIdeaUser(
    $ideaId: String!
    $requiredAge: Int
    $requiredAgeExplanation: String
    $score: Int
    $scoreExplanation: String
  ) {
    createIdeaUser(
      ideaId: $ideaId
      requiredAge: $requiredAge
      requiredAgeExplanation: $requiredAgeExplanation
      score: $score
      scoreExplanation: $scoreExplanation
    )
  }
`;

export const UpdateIdeaUserMutation = gql`
  mutation UpdateIdeaUser(
    $id: String!
    $requiredAge: Int
    $requiredAgeExplanation: String
    $score: Int
    $scoreExplanation: String
  ) {
    updateIdeaUser(
      id: $id
      requiredAge: $requiredAge
      requiredAgeExplanation: $requiredAgeExplanation
      score: $score
      scoreExplanation: $scoreExplanation
    ) {
      id
    }
  }
`;
