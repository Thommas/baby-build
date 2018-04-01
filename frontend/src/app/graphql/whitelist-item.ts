/**
 * Path of child
 *
 * GraphQL - WhitelistItem
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetWhitelistItems = gql`
  query GetWhitelistItems($build_id: String!, $category: String!) {
    whitelistItems(build_id: $build_id, category: $category) {
      id
      title
      required_age
    }
  }
`;

export const CreateWhitelistItemMutation = gql`
  mutation CreateWhitelistItem(
    $title: String!
    $build_id: String!
    $category: String!
    $required_age: Int!
  ) {
    createWhitelistItem(
      title: $title
      build_id: $build_id
      category: $category
      required_age: $required_age
    ) {
      id
    }
  }
`;

export const UpdateWhitelistItemMutation = gql`
  mutation UpdateWhitelistItem(
    $id: ID!
    $title: String!
    $category: String!
    $required_age: Int!
  ) {
    updateWhitelistItem(
      id: $id
      title: $title
      category: $category
      required_age: $required_age
    ) {
      id
    }
  }
`;

export const DeleteWhitelistItem = gql`
  mutation DeleteWhitelistItem(
    $id: ID!
  ) {
    deleteWhitelistItem(
      id: $id
    ) {
      id
    }
  }
`;
