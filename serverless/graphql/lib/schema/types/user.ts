/**
 * Path of child
 *
 * GraphQL - Types - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const User = `
  type User {
    id: String!
    gamification: Gamification
  }
  type Query {
    users: [User]
    user(id: ID!): User
  }
  type Mutation {
    createUser(
      id: ID!
    ): User
    updateUser(
      id: ID!
    ): User
    deleteUser(
      id: ID!
    ): User
  }
`;
export default User;
