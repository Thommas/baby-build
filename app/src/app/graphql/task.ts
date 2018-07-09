/**
 * Path of child
 *
 * GraphQL - Task
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetTasks = gql`
  query GetTasks($build_id: String!) {
    tasks(build_id: $build_id) {
      id
      label
      description
    }
  }
`;

export const CreateTaskMutation = gql`
  mutation CreateTask(
    $build_id: String!
  ) {
    createTask(
      build_id: $build_id
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
