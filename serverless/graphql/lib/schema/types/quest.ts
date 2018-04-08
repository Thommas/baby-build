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
    option1: String
    option2: String
    option3: String
    quest_type: String
  }
  type Query {
    quests(build_id: String!, child_year: Int!): [Quest]
    quest(id: String!): Quest
  }
  type Mutation {
    createQuest(
      build_id: String!
      child_year: Int!
      title: String!
      description: String!
      option1: String
      option2: String
      option3: String
      quest_type: String!
    ): Quest
    updateQuest(
      id: ID!
      title: String!
      description: String!
      option1: String
      option2: String
      option3: String
      quest_type: String!
    ): Quest
    deleteQuest(
      id: ID!
    ): Quest
  }
`;
export default Quest;
