/**
 * Path of child
 *
 * GraphQL - Review
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetReviews = gql`
  query GetReviews($ideaId: String) {
    reviews(ideaId: $ideaId) {
      id
      requiredAge
      requiredAgeExplanation
      score
      scoreExplanation
      ideaId
      userId
      user {
        firstName
        lastName
      }
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
      id
      requiredAge
      requiredAgeExplanation
      score
      scoreExplanation
      ideaId
      userId
      user {
        firstName
        lastName
      }
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
      requiredAge
      requiredAgeExplanation
      score
      scoreExplanation
      ideaId
      userId
      user {
        firstName
        lastName
      }
    }
  }
`;
