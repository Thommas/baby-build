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
    xp: Int!
    lvl: Int!
  }
  type Query {
    user(id: String!): User
    authUser: User
  }
  type Mutation {
    updateUser(
      id: String!
    ): User
  }
`;
export default User;
