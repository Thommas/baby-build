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
    year: Int
  }
  type Query {
    whitelistItems(build_id: String!, year: Int!): [WhitelistItem]
  }
  type Mutation {
    createWhitelistItem(
      title: String!
      build_id: String!
      category: String!
      year: Int!
    ): WhitelistItem
    updateWhitelistItem(
      id: ID!
      title: String
      category: String
    ): WhitelistItem
    deleteWhitelistItem(
      id: ID!
    ): WhitelistItem
  }
`;
export default WhitelistItem;
