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
      title
      category
    }
  }
`;

export const CreateTaskMutation = gql`
  mutation CreateTask(
    $title: String!
    $category: String!
    $build_id: String!
    $child_year: Int!
  ) {
    createTask(
      title: $title
      category: $category
      build_id: $build_id
      child_year: $child_year
    ) {
      id
    }
  }
`;

export const UpdateTaskMutation = gql`
  mutation UpdateTask(
    $id: ID!
    $title: String!
    $category: String!
  ) {
    updateTask(
      id: $id
      title: $title
      category: $category
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
