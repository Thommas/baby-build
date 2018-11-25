/**
 * Path of child
 *
 * GraphQL - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetIdeas = gql`
  query GetIdeas() {
    ideas() {
      id
      label
    }
  }
`;

export const CreateIdeaMutation = gql`
  mutation CreateIdea() {
    createIdea() {
      id
    }
  }
`;

export const UpdateIdeaMutation = gql`
  mutation UpdateIdea(
    $id: ID!
    $label: String
    $description: String
  ) {
    updateIdea(
      id: $id
      label: $label
    ) {
      id
    }
  }
`;

export const DeleteIdeaMutation = gql`
  mutation DeleteIdea(
    $id: ID!
  ) {
    deleteIdea(
      id: $id
    ) {
      id
    }
  }
`;
