/**
 * Path of child
 *
 * GraphQL - Types - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const Idea = `
  type Idea {
    id: String!
    label: String
    requiredAge: Int
    requiredAgeExplanation: String
    score: Int
    scoreExplanation: String
    userId: String!
  }
  type Query {
    ideas: [Idea]
  }
  type Mutation {
    createIdea: Idea
    updateIdea(
      id: ID!
      label: String
      description: String
    ): Idea
    deleteIdea(
      id: ID!
    ): Idea
  }
`;
export default Idea;
