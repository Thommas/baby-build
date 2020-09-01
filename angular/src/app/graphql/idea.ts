/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetIdeas = gql`
  query GetIdeas($ideaInput: IdeaInput, $cursor: String, $sort: String) {
    ideas(ideaInput: $ideaInput, cursor: $cursor, sort: $sort) {
      total
      cursor
      nodes {
        id
        label
        category
        platform
        releaseDate
        timeToCompletion
        language
        requiredAge
        score
        userId
        user {
          firstName
          lastName
        }
        imgs {
          icon
          cover
          screenshot
          png
        }
      }
    }
  }
`;

export const CreateIdeaMutation = gql`
  mutation CreateIdea($label: String!, $category: String!, $platform: String) {
    createIdea(label: $label, category: $category, platform: $platform) {
      id
      label
      category
      platform
      releaseDate
      timeToCompletion
      language
      requiredAge
      score
      userId
      user {
        firstName
        lastName
      }
      imgs {
        icon
        cover
        screenshot
        png
      }
    }
  }
`;

export const UpdateIdeaMutation = gql`
  mutation UpdateIdea(
    $id: String!
    $label: String
    $category: String
    $platform: String
    $releaseDate: String
    $timeToCompletion: Int
    $language: String
    $requiredAge: Float
    $score: Float
  ) {
    updateIdea(
      id: $id
      label: $label
      category: $category
      platform: $platform
      releaseDate: $releaseDate
      timeToCompletion: $timeToCompletion
      language: $language
      requiredAge: $requiredAge
      score: $score
    ) {
      id
      label
      category
      platform
      releaseDate
      timeToCompletion
      language
      requiredAge
      score
      userId
      user {
        firstName
        lastName
      }
      imgs {
        icon
        cover
        screenshot
        png
      }
    }
  }
`;

export const DeleteIdeaMutation = gql`
  mutation DeleteIdea(
    $id: String!
  ) {
    deleteIdea(
      id: $id
    ) {
      id
    }
  }
`;

export const AddAudioIdeaMutation = gql`
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
      category
      platform
      releaseDate
      timeToCompletion
      language
      requiredAge
      score
      userId
      user {
        firstName
        lastName
      }
      imgs {
        icon
        cover
        screenshot
        png
      }
    }
  }
`;

export const RemoveAudioIdeaMutation = gql`
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
      category
      platform
      releaseDate
      timeToCompletion
      language
      requiredAge
      score
      userId
      user {
        firstName
        lastName
      }
      imgs {
        icon
        cover
        screenshot
        png
      }
    }
  }
`;
