/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetCharacters = gql`
  query GetCharacters($characterInput: CharacterInput, $page: Int, $sort: String) {
    characters(characterInput: $characterInput, page: $page, sort: $sort) {
      total
      page
      nodes {
        id
        label
        userId
        user {
          firstName
          lastName
        }
        img
        files {
          id
          name
          type
          size
          data
        }
      }
    }
  }
`;

export const CreateCharacterMutation = gql`
  mutation CreateCharacter($label: String!, $category: String!, $platform: String) {
    createCharacter(label: $label, category: $category, platform: $platform) {
      id
      label
      userId
      user {
        firstName
        lastName
      }
      img
      files {
        id
        name
        type
        size
        data
      }
    }
  }
`;

export const UpdateCharacterMutation = gql`
  mutation UpdateCharacter(
    $id: String!
    $label: String
  ) {
    updateCharacter(
      id: $id
      label: $label
    ) {
      id
      label
      userId
      user {
        firstName
        lastName
      }
      img
      files {
        id
        name
        type
        size
        data
      }
    }
  }
`;

export const DeleteCharacterMutation = gql`
  mutation DeleteCharacter(
    $id: String!
  ) {
    deleteCharacter(
      id: $id
    ) {
      id
    }
  }
`;

export const AddFileCharacterMutation = gql`
  mutation AddFile(
    $id: String!
    $name: String!
    $size: Int!
    $type: String!
    $data: String!
  ) {
    addFile(
      id: $id
      name: $name
      size: $size
      type: $type
      data: $data
    ) {
      id
      label
      userId
      user {
        firstName
        lastName
      }
      img
      files {
        id
        name
        type
        size
        data
      }
    }
  }
`;

export const RemoveFileCharacterMutation = gql`
  mutation RemoveFile(
    $id: String!
    $fileId: String!
  ) {
    removeFile(
      id: $id
      fileId: $fileId
    ) {
      id
      label
      userId
      user {
        firstName
        lastName
      }
      img
      files {
        id
        name
        type
        size
        data
      }
    }
  }
`;
