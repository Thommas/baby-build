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
    required_age: Number
    required_age_explanation: String
    score: Number
    score_explanation: String
    userId: String!
  }
  type Query {
    ideas(childId: String!): [Idea]
  }
  type Mutation {
    createIdea(
      childId: String!
    ): Idea
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
