/**
 * Path of child
 *
 * GraphQL - Favorite
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetFavorites = gql`
  query GetFavorites($build_id: String!, $child_year: Int!) {
    favorites(build_id: $build_id, child_year: $child_year) {
      id
      title
      category
    }
  }
`;

export const CreateFavoriteMutation = gql`
  mutation CreateFavorite(
    $title: String!
    $category: String!
    $build_id: String!
    $child_year: Int!
  ) {
    createFavorite(
      title: $title
      category: $category
      build_id: $build_id
      child_year: $child_year
    ) {
      id
    }
  }
`;

export const UpdateFavoriteMutation = gql`
  mutation UpdateFavorite(
    $id: ID!
    $title: String!
    $category: String!
  ) {
    updateFavorite(
      id: $id
      title: $title
      category: $category
    ) {
      id
    }
  }
`;

export const DeleteFavorite = gql`
  mutation DeleteFavorite(
    $id: ID!
  ) {
    deleteFavorite(
      id: $id
    ) {
      id
    }
  }
`;
