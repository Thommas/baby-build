/**
 * Path of child
 *
 * GraphQL - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetReview = gql`
  query GetReview {
    review {
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

export const CreateReviewMutation = gql`
  mutation CreateReview(
    $ideaId: String!
    $requiredAge: Int
    $requiredAgeExplanation: String
    $score: Int
    $scoreExplanation: String
  ) {
    createReview(
      ideaId: $ideaId
      requiredAge: $requiredAge
      requiredAgeExplanation: $requiredAgeExplanation
      score: $score
      scoreExplanation: $scoreExplanation
    ) {
      ideaId
    }
  }
`;

export const UpdateReviewMutation = gql`
  mutation UpdateReview(
    $id: String!
    $requiredAge: Int
    $requiredAgeExplanation: String
    $score: Int
    $scoreExplanation: String
  ) {
    updateReview(
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
