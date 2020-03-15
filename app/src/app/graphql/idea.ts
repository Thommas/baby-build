/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetIdeas = gql`
  query GetIdeas($ideaInput: IdeaInput, $cursor: String) {
    ideas(ideaInput: $ideaInput, cursor: $cursor) {
      total
      cursor
      nodes {
        id
        label
        icon
        requiredAge
        score
        userId
        user {
          firstName
          lastName
        }
      }
    }
  }
`;

export const CreateIdeaMutation = gql`
  mutation CreateIdea($label: String!) {
    createIdea(label: $label) {
      id
      label
      icon
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
    $requiredAge: Float
    $score: Float
  ) {
    updateIdea(
      id: $id
      label: $label
      requiredAge: $requiredAge
      score: $score
    ) {
      id
      label
      icon
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

export const UpdateIdeaIconMutation = gql`
  mutation UpdateIdeaIcon(
    $id: String!
  ) {
    updateIdeaIcon(
      id: $id
    ) {
      id
      label
      icon
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
