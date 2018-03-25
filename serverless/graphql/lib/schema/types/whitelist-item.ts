/**
 * Path of child
 *
 * GraphQL - Types - Whitelist Item
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const WhitelistItem = `
  type WhitelistItem {
    id: String!
    title: String
    category: String
    required_age: Int
  }
  type Query {
    whitelistItems(build_id: String!, category: String!): [WhitelistItem]
  }
  type Mutation {
    createWhitelistItem(
      title: String!
      build_id: String!
      category: String!
      required_age: Int!
    ): WhitelistItem
    updateWhitelistItem(
      id: ID!
      title: String
      required_age: Int
      category: String
    ): WhitelistItem
    deleteWhitelistItem(
      id: ID!
    ): WhitelistItem
  }
`;
export default WhitelistItem;
