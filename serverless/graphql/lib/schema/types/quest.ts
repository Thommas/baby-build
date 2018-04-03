/**
 * Path of child
 *
 * GraphQL - Types - Quest
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const Quest = `
  type Quest {
    id: String!
    title: String
    description: String
  }
  type Query {
    quests(build_id: String!, child_year: Int!): [Quest]
  }
  type Mutation {
    createQuest(
      title: String!
      description: String!
      build_id: String!
      child_year: Int!
    ): Quest
    updateQuest(
      id: ID!
      title: String!
      description: String!
    ): Quest
    deleteQuest(
      id: ID!
    ): Quest
  }
`;
export default Quest;
