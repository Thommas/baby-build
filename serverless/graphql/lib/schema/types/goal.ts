/**
 * Path of child
 *
 * GraphQL - Types - Goal
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const Goal = `
  type Goal {
    id: String!
    title: String
    description: String
  }
  type Query {
    goals(build_id: String!, child_year: Int!): [Goal]
  }
  type Mutation {
    createGoal(
      title: String!
      description: String!
      build_id: String!
      child_year: Int!
    ): Goal
    updateGoal(
      id: ID!
      title: String!
      description: String!
    ): Goal
    deleteGoal(
      id: ID!
    ): Goal
  }
`;
export default Goal;
