/**
 * Path of child
 *
 * GraphQL - Child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetChild = gql`
  query GetChild($id: ID!) {
    child(id: $id) {
      id
      firstname
      middlename
      lastname
      nickname
      birthdate
      gender
      gamification {
        xp
        level
      }
    }
  }
`;

export const GetChildren = gql`
  query GetChildren {
    children {
      id
      firstname
      middlename
      lastname
      nickname
      birthdate
      gender
      gamification {
        xp
        level
      }
    }
  }
`;

export const DeleteChildMutation = gql`
  mutation DeleteChild(
    $id: ID!
  ) {
    deleteChild(
      id: $id
    ) {
      id
    }
  }
`;

export const CreateChildMutation = gql`
  mutation CreateChild(
    $firstname: String!
    $middlename: String!
    $lastname: String!
    $nickname: String!
    $birthdate: String!
    $gender: Boolean!
  ) {
    createChild(
      firstname: $firstname
      middlename: $middlename
      lastname: $lastname
      nickname: $nickname
      birthdate: $birthdate
      gender: $gender
    ) {
      id
    }
  }
`;

export const UpdateChildMutation = gql`
  mutation UpdateChild(
    $id: ID!
    $firstname: String!
    $middlename: String!
    $lastname: String!
    $nickname: String!
    $birthdate: String!
    $gender: Boolean!
  ) {
    updateChild(
      id: $id
      firstname: $firstname
      middlename: $middlename
      lastname: $lastname
      nickname: $nickname
      birthdate: $birthdate
      gender: $gender
    ) {
      id
    }
  }
`;
