/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetTags = gql`
  query GetTags($label: String) {
    tags(label: $label) {
      id
      label
      userId
      user {
        firstName
        lastName
      }
    }
  }
`;

export const CreateTagMutation = gql`
  mutation CreateTag(
    $label: String!
  ) {
    createTag(
      label: $label
    ) {
      id
      label
      userId
      user {
        firstName
        lastName
      }
    }
  }
`;

export const UpdateTagMutation = gql`
  mutation UpdateTag(
    $id: String!
    $label: String
  ) {
    updateTag(
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
    }
  }
`;

export const DeleteTagMutation = gql`
  mutation DeleteTag(
    $id: String!
  ) {
    deleteTag(
      id: $id
    ) {
      id
      label
      userId
      user {
        firstName
        lastName
      }
    }
  }
`;
