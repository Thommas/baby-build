/**
 * Path of build
 *
 * GraphQL - Types - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const User = `
  type User {
    id: String!
    current_build_id: String
    xp: Int!
    lvl: Int!
  }
  type Query {
    users: [User]
    user(id: ID!): User
    authUser: User
  }
  type Mutation {
    createUser(
      id: ID!
    ): User
    updateUser(
      id: ID!
      current_build_id: String
    ): User
    deleteUser(
      id: ID!
    ): User
  }
`;
export default User;
