/**
 * Path of child
 *
 * GraphQL - Types - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const IdeaUser = `
  type IdeaUser {
    id: String!
    requiredAge: Int
    requiredAgeExplanation: String
    score: Int
    scoreExplanation: String
    ideaId: String!
    userId: String!
  }
  type Query {
    ideaUsers: [IdeaUser]
  }
  type Mutation {
    createIdeaUser: IdeaUser
    updateIdeaUser(
      id: ID!
      requiredAge: Int
      requiredAgeExplanation: String
      score: Int
      scoreExplanation: String
    ): Idea
  }
`;
export default IdeaUser;
