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
      middlenames
      lastname
      nickname
      birthdate
      gender
      xp
      lvl
    }
  }
`;

export const GetChildren = gql`
  query GetChildren {
    children {
      id
      firstname
      middlenames
      lastname
      nickname
      birthdate
      gender
      xp
      lvl
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
    $middlenames: String!
    $lastname: String!
    $nickname: String!
    $birthdate: String!
    $gender: String!
  ) {
    createChild(
      firstname: $firstname
      middlenames: $middlenames
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
    $middlenames: String!
    $lastname: String!
    $nickname: String!
    $birthdate: String!
    $gender: String!
  ) {
    updateChild(
      id: $id
      firstname: $firstname
      middlenames: $middlenames
      lastname: $lastname
      nickname: $nickname
      birthdate: $birthdate
      gender: $gender
    ) {
      id
    }
  }
`;
