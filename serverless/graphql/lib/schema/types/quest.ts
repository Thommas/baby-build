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
  }
  type Query {
    quests: [Quest]
    quest(id: ID!): Quest
  }
  type Mutation {
    createQuest(
      title: String!
      build_id: String!
    ): Quest
    updateQuest(
      id: ID!
      title: String!
    ): Quest
    deleteQuest(
      id: ID!
    ): Quest
  }
`;
export default Quest;
