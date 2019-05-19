/**
 * Path of child
 *
 * GraphQL - Types - Sharing
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const Sharing = `
  type Sharing {
    id: String
    userId: String
    sharerId: String
    user: User
  }
  type Query {
    sharings: [Sharing]
  }
  type Mutation {
    createSharing(
      userId: String!
    ): Sharing
    deleteSharing(
      id: String!
    ): Sharing
  }
`;
export default Sharing;
