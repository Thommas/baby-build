/**
 * Path of child
 *
 * GraphQL - Tag
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetTags = gql`
  query GetTags {
    tags {
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
  mutation CreateTag {
    createTag {
      id
      label
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
    }
  }
`;
