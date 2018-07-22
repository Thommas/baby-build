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
    label: String
    description: String
    type: String
    userId: String!
    buildId: String!
    parentId: String
  }
  type Query {
    tasks(buildId: String!, parentId: String): [Task]
  }
  type Mutation {
    createTask(
      buildId: String!
      parentId: String
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
