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
    build_id: String!
  }
  type Query {
    tasks(build_id: String!): [Task]
  }
  type Mutation {
    createTask(
      build_id: String!
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
