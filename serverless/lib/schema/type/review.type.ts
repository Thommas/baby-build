/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const { gql } = require('apollo-server-lambda');

const Review = gql`
  type Review {
    id: String
    requiredAge: Int
    requiredAgeExplanation: String
    score: Int
    scoreExplanation: String
    ideaId: String
    userId: String
    user: User
  }
  type Query {
    reviews(ideaId: String): [Review]
  }
  type Mutation {
    createReview(
      ideaId: String!
      requiredAge: Int
      requiredAgeExplanation: String
      score: Int
      scoreExplanation: String
    ): Review
    updateReview(
      id: String!
      requiredAge: Int
      requiredAgeExplanation: String
      score: Int
      scoreExplanation: String
    ): Review
  }
`;
export default Review;
