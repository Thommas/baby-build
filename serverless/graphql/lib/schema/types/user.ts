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
    xp: Int
    level: Int
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
      xp: Int
      level: Int
    ): User
    deleteUser(
      id: ID!
    ): User
  }
`;
export default User;
