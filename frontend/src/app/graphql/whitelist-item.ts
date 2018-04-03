/**
 * Path of child
 *
 * GraphQL - WhitelistItem
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetWhitelistItems = gql`
  query GetWhitelistItems($build_id: String!, $child_year: Int!) {
    whitelistItems(build_id: $build_id, child_year: $child_year) {
      id
      title
      category
    }
  }
`;

export const CreateWhitelistItemMutation = gql`
  mutation CreateWhitelistItem(
    $title: String!
    $build_id: String!
    $category: String!
    $child_year: Int!
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
    $child_year: Int!
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
