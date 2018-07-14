/**
 * Path of build
 *
 * GraphQL - Types - Task
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const Task = `
  type Task {
    id: String!
    label: String
    description: String
    type: String
    userId: String!
    buildId: String!
  }
  type Query {
    tasks(buildId: String!): [Task]
  }
  type Mutation {
    createTask(
      buildId: String!
    ): Task
    updateTask(
      id: ID!
      label: String
      description: String
    ): Task
    deleteTask(
      id: ID!
    ): Task
  }
`;
export default Task;
