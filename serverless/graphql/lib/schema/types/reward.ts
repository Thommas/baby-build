/**
 * Path of child
 *
 * GraphQL - Types - Reward
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const Reward = `
  type Reward {
    id: String!
    title: String
    description: String
  }
  type Query {
    rewards(build_id: String!, child_year: Int!): [Reward]
    reward(id: String!): Reward
  }
  type Mutation {
    createReward(
      title: String!
      description: String!
      build_id: String!
      child_year: Int!
    ): Reward
    updateReward(
      id: ID!
      title: String!
      description: String!
    ): Reward
    deleteReward(
      id: ID!
    ): Reward
  }
`;
export default Reward;
