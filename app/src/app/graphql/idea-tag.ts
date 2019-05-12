/**
 * Path of child
 *
 * GraphQL - IdeaTag
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetIdeaTags = gql`
  query GetIdeaTags($ideaId: String!) {
    ideaTags(ideaId: $ideaId) {
      id
      tag {
        label
      }
      userId
    }
  }
`;

export const CreateIdeaTagMutation = gql`
  mutation CreateIdeaTag($ideaId: String!, $tagId: String!) {
    createIdeaTag(ideaId: $ideaId, tagId: $tagId) {
      id
    }
  }
`;

export const DeleteIdeaTagMutation = gql`
  mutation DeleteIdeaTag(
    $id: String!
  ) {
    deleteIdeaTag(
      id: $id
    ) {
      id
    }
  }
`;
