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
      ideaId
      userId
      requiredAge
      requiredAgeExplanation
      score
      scoreExplanation
    }
  }
`;

export const UpdateIdeaUserMutation = gql`
  mutation UpdateIdeaUser(
    $ideaId: String!
    $userId: String!
    $requiredAge: Int
    $requiredAgeExplanation: String
    $score: Int
    $scoreExplanation: String
  ) {
    updateIdeaUser(
      ideaId: $ideaId
      userId: $userId
      requiredAge: $requiredAge
      requiredAgeExplanation: $requiredAgeExplanation
      score: $score
      scoreExplanation: $scoreExplanation
    ) {
      id
    }
  }
`;
