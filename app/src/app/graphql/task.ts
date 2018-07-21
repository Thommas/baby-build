/**
 * Path of child
 *
 * GraphQL - Task
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetTasks = gql`
  query GetTasks($buildId: String!, $parentId: String) {
    tasks(buildId: $buildId, parentId: $parentId) {
      id
      label
      description
      buildId
      parentId
    }
  }
`;

export const CreateTaskMutation = gql`
  mutation CreateTask(
    $buildId: String!
    $parentId: String
  ) {
    createTask(
      buildId: $buildId
      parentId: $parentId
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

export const DeleteTaskMutation = gql`
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
