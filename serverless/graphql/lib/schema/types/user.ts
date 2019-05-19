/**
 * Path of child
 *
 * GraphQL - Types - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const User = `
  type User {
    id: String
    firstName: String
    lastName: String
    xp: Int
    lvl: Int
    nextLvlXp: Int
  }
  type Query {
    users(searchQuery: String!): [User]
    user(id: String!): User
    authUser: User
  }
  type Mutation {
    updateUser(
      id: String!
      firstName: String
      lastName: String
    ): User
  }
`;
export default User;
