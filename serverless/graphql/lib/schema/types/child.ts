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
    middlenames: String
    lastname: String
    nickname: String
    birthdate: String
    gender: String
    gamification: Gamification
    goal_count: Int
  }
  type Query {
    children: [Child]
    child(id: ID!): Child
  }
  type Mutation {
    createChild(
      firstname: String!
      middlenames: String!
      lastname: String!
      nickname: String!
      birthdate: String!
      gender: String!
    ): Child
    updateChild(
      id: ID!
      firstname: String
      middlenames: String
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
