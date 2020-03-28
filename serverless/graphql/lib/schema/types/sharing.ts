/**
 * Path of child
 *
 * GraphQL - Types - Sharing
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const { gql } = require('apollo-server-lambda');

const Sharing = gql`
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
