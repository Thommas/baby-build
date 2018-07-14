/**
 * Path of child
 *
 * GraphQL - Task
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetTasks = gql`
  query GetTasks($buildId: String!) {
    tasks(buildId: $buildId) {
      id
      label
      description
    }
  }
`;

export const CreateTaskMutation = gql`
  mutation CreateTask(
    $buildId: String!
  ) {
    createTask(
      buildId: $buildId
    ) {
      id
    }
  }
`;

export const UpdateTaskMutation = gql`
  mutation UpdateTask(
    $id: ID!
    $label: String
    $description: String
  ) {
    updateTask(
      id: $id
      label: $label
      description: $description
    ) {
      id
    }
  }
`;

export const DeleteTask = gql`
  mutation DeleteTask(
    $id: ID!
  ) {
    deleteTask(
      id: $id
    ) {
      id
    }
  }
`;
