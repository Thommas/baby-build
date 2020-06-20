/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetCharacters = gql`
  query GetCharacters($characterInput: CharacterInput, $cursor: String, $sort: String) {
    characters(characterInput: $characterInput, cursor: $cursor, sort: $sort) {
      total
      cursor
      nodes {
        id
        label
        userId
        user {
          firstName
          lastName
        }
        img
        audios {
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
      audios {
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
      audios {
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

export const AddAudioCharacterMutation = gql`
  mutation AddAudio(
    $id: String!
    $name: String!
    $size: Int!
    $type: String!
    $data: String!
  ) {
    addAudio(
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
      audios {
        id
        name
        type
        size
        data
      }
    }
  }
`;

export const RemoveAudioCharacterMutation = gql`
  mutation RemoveAudio(
    $id: String!
    $fileId: String!
  ) {
    removeAudio(
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
      audios {
        id
        name
        type
        size
        data
      }
    }
  }
`;
