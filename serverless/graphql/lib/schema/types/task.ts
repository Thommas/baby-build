/**
 * Path of child
 *
 * GraphQL - Types - Task
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const Task = `
  type Task {
    id: String!
    child_id: String!
    name: String!
    description: String!
    type: String!
  }
  type Query {
    favorites(build_id: String!, child_year: Int!): [Task]
  }
  type Mutation {
    createTask(
      child_id: String!
      name: String!
      description: String!
    ): Task
    updateTask(
      id: ID!
      name: String!
      description: String!
      type: String!
    ): Task
    deleteTask(
      id: ID!
    ): Task
  }
`;
export default Task;
