/**
 * Path of child
 *
 * GraphQL - Lvl
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetLvls = gql`
  query GetLvls($skillId: String!) {
    lvls(skillId: $skillId) {
      id
      label
      description
      skillId
    }
  }
`;

export const CreateLvlMutation = gql`
  mutation CreateLvl(
    $skillId: String!
  ) {
    createLvl(
      skillId: $skillId
    ) {
      id
    }
  }
`;

export const UpdateLvlMutation = gql`
  mutation UpdateLvl(
    $id: ID!
    $label: String
    $description: String
  ) {
    updateLvl(
      id: $id
      label: $label
      description: $description
    ) {
      id
    }
  }
`;

export const DeleteLvlMutation = gql`
  mutation DeleteLvl(
    $id: ID!
  ) {
    deleteLvl(
      id: $id
    ) {
      id
    }
  }
`;
