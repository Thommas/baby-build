/**
 * Path of child
 *
 * GraphQL - Types - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const Review = `
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
