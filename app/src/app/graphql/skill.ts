/**
 * Path of child
 *
 * GraphQL - Skill
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetSkills = gql`
  query GetSkills($buildId: String!) {
    skills(buildId: $buildId) {
      id
      label
      description
      buildId
    }
  }
`;

export const CreateSkillMutation = gql`
  mutation CreateSkill(
    $buildId: String!
  ) {
    createSkill(
      buildId: $buildId
    ) {
      id
    }
  }
`;

export const UpdateSkillMutation = gql`
  mutation UpdateSkill(
    $id: ID!
    $label: String
    $description: String
  ) {
    updateSkill(
      id: $id
      label: $label
      description: $description
    ) {
      id
    }
  }
`;

export const DeleteSkillMutation = gql`
  mutation DeleteSkill(
    $id: ID!
  ) {
    deleteSkill(
      id: $id
    ) {
      id
    }
  }
`;
