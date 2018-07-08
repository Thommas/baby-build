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
    build_id: String!
    name: String!
    description: String!
    type: String!
  }
  type Query {
    tasks(build_id: String!): [Task]
  }
  type Mutation {
    createTask(
      build_id: String!
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
