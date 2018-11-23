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
    first_name: String
    middle_names: String
    last_name: String
    nickname: String
    gender: Boolean
    birthdate: String
    user: User!
  }
  type Query {
    childs: [Child]
    child(id: ID!): Child
  }
  type Mutation {
    createChild(
      first_name: String
      middle_names: String
      last_name: String
      nickname: String
      gender: Boolean
      birthdate: String
    ): Child
    updateChild(
      id: ID!
      first_name: String
      middle_names: String
      last_name: String
      nickname: String
      gender: Boolean
      birthdate: String
    ): Child
    deleteChild(
      id: ID!
    ): Child
  }
`;
export default Child;
