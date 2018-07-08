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
      name
      description
    }
  }
`;

export const CreateTaskMutation = gql`
  mutation CreateTask(
    $name: String!
    $description: String
    $build_id: String!
  ) {
    createTask(
      name: $name
      build_id: $build_id
    ) {
      id
    }
  }
`;

export const UpdateTaskMutation = gql`
  mutation UpdateTask(
    $id: ID!
    $name: String!
    $description: String
  ) {
    updateTask(
      id: $id
      name: $name
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
