/**
 * Path of child
 *
 * GraphQL - Types - Child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const Child = `
  type Child {
    id: String!
    firstname: String
    middlename: String
    lastname: String
    nickname: String
    birthdate: String
    gender: String
    xp: Int
    level: Int
    builds: [Build]
  }
  type ChildContainer {
    edges: [ChildEdge]
  }
  type ChildEdge {
    cursor: String!
    node: Child
  }
  type Query {
    children: [Child]
    child(id: ID!): Child
  }
  type Mutation {
    createChild(
      firstname: String!
      middlename: String!
      lastname: String!
      nickname: String!
      birthdate: String!
      gender: String!
    ): Child
    updateChild(
      id: ID!
      firstname: String
      middlename: String
      lastname: String
      nickname: String
      birthdate: String
      gender: String
    ): Child
    deleteChild(
      id: ID!
    ): Child
  }
`;
export default Child;
