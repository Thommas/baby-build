/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetIdeas = gql`
  query GetIdeas($ideaInput: IdeaInput, $page: Int, $sort: String) {
    ideas(ideaInput: $ideaInput, page: $page, sort: $sort) {
      total
      page
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
        icons {
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
